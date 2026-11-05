import type { Config } from "@netlify/functions";
import { asc, eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { products } from "../../db/schema.js";
import seed from "../../db.json" with { type: "json" };

type ProductInput = Partial<typeof products.$inferInsert>;

const FIELDS = [
  "title", "image", "price", "oldPrice", "discount", "category",
  "rating", "reviewCount", "delivery", "link",
] as const;

const pick = (body: Record<string, unknown>): ProductInput => {
  const out: Record<string, unknown> = {};
  for (const f of FIELDS) if (body[f] !== undefined) out[f] = body[f];
  return out as ProductInput;
};

const toJson = ({ createdAt, ...p }: typeof products.$inferSelect) => p;

// Seed the products table from db.json the first time it's empty.
let seeded = false;
const ensureSeeded = async () => {
  if (seeded) return;
  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(products);
  if (count === 0) {
    const rows = (seed as any).products.map((p: any) => ({ id: String(p.id), ...pick(p) }));
    await db.insert(products).values(rows).onConflictDoNothing();
  }
  seeded = true;
};

const notFound = () => Response.json({ error: "Not found" }, { status: 404 });

export default async (req: Request) => {
  const url = new URL(req.url);
  const [resource, id] = url.pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean);

  if (resource === "products") {
    try {
      await ensureSeeded();
    } catch (error) {
      // Database unavailable (e.g. migrations not applied yet): fall back to db.json, read-only.
      console.error("Database unavailable, serving products from db.json:", error);
      if (req.method !== "GET") {
        return Response.json({ error: "Database unavailable" }, { status: 503 });
      }
      const list = (seed as any).products as any[];
      if (!id) return Response.json(list);
      const item = list.find((x) => String(x.id) === id);
      return item ? Response.json(item) : notFound();
    }

    if (req.method === "GET") {
      if (id) {
        const [row] = await db.select().from(products).where(eq(products.id, id));
        return row ? Response.json(toJson(row)) : notFound();
      }
      const rows = await db.select().from(products).orderBy(asc(products.createdAt));
      return Response.json(rows.map(toJson));
    }

    if (req.method === "POST" && !id) {
      const body = await req.json();
      const [row] = await db
        .insert(products)
        .values({ id: crypto.randomUUID().slice(0, 8), ...pick(body) })
        .returning();
      return Response.json(toJson(row), { status: 201 });
    }

    if ((req.method === "PATCH" || req.method === "PUT") && id) {
      const body = await req.json();
      const values = pick(body);
      if (Object.keys(values).length === 0) return Response.json({ error: "No fields" }, { status: 400 });
      const [row] = await db.update(products).set(values).where(eq(products.id, id)).returning();
      return row ? Response.json(toJson(row)) : notFound();
    }

    if (req.method === "DELETE" && id) {
      const [row] = await db.delete(products).where(eq(products.id, id)).returning();
      return row ? Response.json(toJson(row)) : notFound();
    }

    return new Response("Method not allowed", { status: 405 });
  }

  // All other collections are static site content served from db.json.
  if (req.method !== "GET") return new Response("Method not allowed", { status: 405 });
  const data = (seed as Record<string, unknown>)[resource];
  if (!resource || resource === "$schema" || data === undefined) return notFound();
  if (id) {
    if (!Array.isArray(data)) return notFound();
    const item = data.find((x: any) => String(x.id) === id);
    return item ? Response.json(item) : notFound();
  }
  return Response.json(data);
};

export const config: Config = {
  path: ["/api/*"],
};
