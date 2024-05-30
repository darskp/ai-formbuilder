import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const jsonForms = pgTable('jsonForms', {
    id: serial('id').primaryKey(),
    jsonForm: text('jsonForm').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    theme: varchar('theme').notNull().default(''),
    gradient: varchar('gradient').default(''),
    style: varchar('style')
});

export const userResponses = pgTable('userResponses', {
    id: serial('id').primaryKey(),
    formData: text('formData').notNull(),
    createdBy: varchar('createdBy').default("anonymous"),
    createdAt: varchar('createdAt').notNull(),
    formRefId: integer('formRefId').notNull().references(() => jsonForms.id),
});