
import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    address: text(),
    role: varchar({ length: 255 }).notNull().default("user"),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
    deletedAt: timestamp().defaultNow(),
    isActive: boolean().notNull().default(true),
});

export const createUserSchema = createInsertSchema(usersTable).omit({
   id: true,
   role: true,});
export const loginSchema = createInsertSchema(usersTable).pick({
   email: true,
   password: true,});