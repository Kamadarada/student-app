import db from "../db/index.js";
import { randomUUID } from "node:crypto";
import { enrollmentsTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

export async function getAllEnrollmentsService() {
	const enrollments = await db.select().from(enrollmentsTable);
	return enrollments;
}

export async function createEnrollmentService(enrollmentData) {
	const { studentId, disciplineId, enrollmentDate } = enrollmentData;

	const [newEnrollment] = await db
		.insert(enrollmentsTable)
		.values({
			id: randomUUID(),
			studentId,
			disciplineId,
			enrollmentDate,
		})
		.returning();

	return newEnrollment;
}

export async function deleteEnrollmentService(enrollmentId) {
	const result = await db
		.delete(enrollmentsTable)
		.where(eq(enrollmentsTable.id, enrollmentId));

	return result.rowCount;
}

export async function updateEnrollmentService(enrollmentId, enrollmentData) {
	const { studentId, disciplineId, enrollmentDate } = enrollmentData;

	const [updatedEnrollment] = await db
		.update(enrollmentsTable)
		.set({
			disciplineId,
			studentId,
			enrollmentDate,
		})
		.where(eq(enrollmentsTable.id, enrollmentId))
		.returning();

	return updatedEnrollment;
}
