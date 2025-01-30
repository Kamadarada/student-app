import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { studentsTable } from "../db/schema.js";
import { randomUUID } from "node:crypto";

export async function getAllStudentsService() {
	const students = await db.select().from(studentsTable);
	return students;
}
export async function createStudentService(studentData) {
	const { name, email, birthDate, phone } = studentData;

	const [newStudent] = await db
		.insert(studentsTable)
		.values({
			id: randomUUID(),
			name,
			email,
			birthDate,
			phone,
		})
		.returning();

	return newStudent;
}

export async function deleteStudentService(studentId) {
	const result = await db
		.delete(studentsTable)
		.where(eq(studentsTable.id, studentId));

	return result.rowCount;
}

export async function updateStudentService(studentId, studentData) {
	const [updatedStudent] = await db
		.update(studentsTable)
		.set(studentData)
		.where(eq(studentsTable.id, studentId))
		.returning();

	return updatedStudent;
}
