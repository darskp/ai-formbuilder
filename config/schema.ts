import { borderStyles } from "@/app/_data/borderStyle";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const jsonForms = pgTable('jsonForms', {
    id: serial('id').primaryKey(),
    jsonForm: text('jsonForm').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    theme: varchar('theme').notNull().default(''),
    gradient: varchar('gradient').default(''),
    style: varchar('style')
});