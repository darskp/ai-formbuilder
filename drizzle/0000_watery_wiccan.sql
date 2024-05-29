-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "jsonForms" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonForm" text NOT NULL,
	"createdBy" varchar NOT NULL,
	"createdAt" varchar NOT NULL,
	"theme" varchar DEFAULT '' NOT NULL,
	"gradient" varchar DEFAULT '',
	"style" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userResponses" (
	"id" serial PRIMARY KEY NOT NULL,
	"formData" text NOT NULL,
	"createdBy" varchar DEFAULT 'anonymous',
	"createdAt" varchar NOT NULL,
	"formRef" varchar
);

*/