CREATE TABLE "products" (
	"id" text PRIMARY KEY,
	"title" text DEFAULT '' NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"price" integer DEFAULT 0 NOT NULL,
	"old_price" integer DEFAULT 0 NOT NULL,
	"discount" integer DEFAULT 0 NOT NULL,
	"category" text DEFAULT '' NOT NULL,
	"rating" double precision DEFAULT 0 NOT NULL,
	"review_count" integer DEFAULT 0 NOT NULL,
	"delivery" text DEFAULT '' NOT NULL,
	"link" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
