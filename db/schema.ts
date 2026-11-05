import { pgTable, text, integer, doublePrecision, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: text().primaryKey(),
  title: text().notNull().default(""),
  image: text().notNull().default(""),
  price: integer().notNull().default(0),
  oldPrice: integer("old_price").notNull().default(0),
  discount: integer().notNull().default(0),
  category: text().notNull().default(""),
  rating: doublePrecision().notNull().default(0),
  reviewCount: integer("review_count").notNull().default(0),
  delivery: text().notNull().default(""),
  link: text().notNull().default(""),
  createdAt: timestamp("created_at").defaultNow(),
});
