import { integer, pgTable, varchar, date } from "drizzle-orm/pg-core";

// Users Table 
export const studentsTable = pgTable("students", {
	id: varchar("id").primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	birthDate: date().notNull(),
	phone: varchar({ length: 20 }), 
});

// Disciplines Table 
export const disciplinesTable = pgTable("disciplines", {
	id: varchar("id").primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	workload: integer().notNull(),
});

// Enrollments Table 
export const enrollmentsTable = pgTable("enrollments", {
	id: varchar("id").primaryKey(),
	studentId: varchar()
		.notNull()
		.references(() => studentsTable.id), 
	disciplineId: varchar()
		.notNull()
		.references(() => disciplinesTable.id), 
	enrollmentDate: date().notNull(),
});
