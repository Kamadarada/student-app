CREATE TABLE "disciplines" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"workload" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "enrollments" (
	"id" varchar PRIMARY KEY NOT NULL,
	"studentId" varchar NOT NULL,
	"disciplineId" varchar NOT NULL,
	"enrollmentDate" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"birthDate" date NOT NULL,
	"phone" varchar(20),
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_studentId_students_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_disciplineId_disciplines_id_fk" FOREIGN KEY ("disciplineId") REFERENCES "public"."disciplines"("id") ON DELETE no action ON UPDATE no action;