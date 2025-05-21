import { doublePrecision, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  image: varchar({ length: 255 }),
  category: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
});

export const listProductSchema = createInsertSchema(productsTable);
export const getProductSchema = createInsertSchema(productsTable);
export const createProductSchema = createInsertSchema(productsTable).omit({
 });
export const updateProductSchema = createInsertSchema(productsTable).omit({
 }).partial();
export const deleteProductSchema = createInsertSchema(productsTable);