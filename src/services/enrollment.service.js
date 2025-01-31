import db from "../db/index.js";
import { randomUUID } from "node:crypto";
import { disciplinesTable, enrollmentsTable, studentsTable } from "../db/schema.js";
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

export async function getEnrollmentStudentService() {
	const enrollments = await db
		.select({
			enrollmentId: enrollmentsTable.id,
			enrollmentDate: enrollmentsTable.enrollmentDate,
			studentId: studentsTable.id,
			studentName: studentsTable.name,
			studentEmail: studentsTable.email,
			disciplineId: disciplinesTable.id,
			disciplineName: disciplinesTable.name,
		})
		.from(enrollmentsTable)
		.leftJoin(studentsTable, eq(enrollmentsTable.studentId, studentsTable.id))
		.leftJoin(disciplinesTable, eq(enrollmentsTable.disciplineId, disciplinesTable.id));

	
	const grouped = enrollments.reduce((acc, enrollment) => {
		const { disciplineId, disciplineName, studentId, studentName, studentEmail, enrollmentDate } = enrollment;

		let discipline = acc.find(d => d.disciplineId === disciplineId);

		if (!discipline) {
			discipline = {
				disciplineId,
				disciplineName,
				students: [],
			};
			acc.push(discipline);
		}

		
		discipline.students.push({
			id: studentId,
			name: studentName,
			email: studentEmail,
			enrollmentDate,
		});

		return acc;
	}, []);

	return grouped;
}
