import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const jsonForms = pgTable("jsonForms", {
	id: serial("id").primaryKey().notNull(),
	jsonForm: text("jsonForm").notNull(),
	createdBy: varchar("createdBy").notNull(),
	createdAt: varchar("createdAt").notNull(),
	theme: varchar("theme").default('').notNull(),
	gradient: varchar("gradient").default(''),
	style: varchar("style"),
});

export const userResponses = pgTable("userResponses", {
	id: serial("id").primaryKey().notNull(),
	formData: text("formData").notNull(),
	createdBy: varchar("createdBy").default('anonymous'),
	createdAt: varchar("createdAt").notNull(),
	formRef: varchar("formRef"),
});