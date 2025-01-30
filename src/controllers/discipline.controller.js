import {
	createDisciplineService,
	deleteDisciplineService,
	getAllDisciplinesService,
	updateDisciplineService,
} from "../services/discipline.service.js";

export async function createNewDiscipline(request, reply) {
	const disciplineData = request.body;
	try {
		const discipline = await createDisciplineService(disciplineData);
		reply.status(201).send(discipline); 
	} catch (error) {
		reply.status(500).send({
			message: "Failed to create new discipline",
			error: error.message,
		});
	}
}

export async function getAllDisciplines(request, reply) {
	try {
		const disciplines = await getAllDisciplinesService();
		reply.status(200).send(disciplines);
	} catch (error) {
		reply
			.status(500)
			.send({ message: "Failed to get disciplines", error: error.message });
	}
}

export async function deleteDiscipline(request, reply) {
	const disciplineId = request.params.id; 
	try {
		const result = await deleteDisciplineService(disciplineId);

		if (result === 0) {
			return reply
				.status(404)
				.send({ message: `Discipline ${disciplineId} not found` });
		}

		reply.status(200).send({
			message: `Discipline ${disciplineId} deleted successfully`,
		});
	} catch (error) {
		reply.status(500).send({
			message: `Failed to delete discipline ${disciplineId}`,
			error: error.message,
		});
	}
}

export async function updateDiscipline(request, reply) {
	const disciplineId = request.params.id;
	const disciplineData = request.body; 

	try {
		const discipline = await updateDisciplineService(
			disciplineId,
			disciplineData,
		);
		reply.status(200).send(discipline);
	} catch (error) {
		reply.status(500).send({
			message: `Failed to update discipline ${disciplineId}`,
			error: error.message,
		});
	}
}
