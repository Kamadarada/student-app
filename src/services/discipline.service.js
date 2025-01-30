import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { disciplinesTable } from "../db/schema.js";
import { randomUUID } from "node:crypto";

export async function getAllDisciplinesService() {
	const disciplines = await db.select().from(disciplinesTable);
	return disciplines;
}

export async function createDisciplineService(disciplineData) {
	const { name, workload } = disciplineData;

	const [newDiscipline] = await db
		.insert(disciplinesTable)
		.values({
			id: randomUUID(),
			name,
			workload,
		})
		.returning();

	return newDiscipline;
}

export async function deleteDisciplineService(disciplineId) {
	const result = await db
		.delete(disciplinesTable)
		.where(eq(disciplinesTable.id, disciplineId));

	return result.rowCount;
}

export async function updateDisciplineService(disciplineId, disciplineData) {
	const { name, workload } = disciplineData;
	const [updatedDiscipline] = await db
		.update(disciplinesTable)
		.set({
			name,
			workload,
		})
		.where(eq(disciplinesTable.id, disciplineId))
		.returning();

	return updatedDiscipline;
}
