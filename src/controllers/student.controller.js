import {
	createStudentService,
	deleteStudentService,
	getAllStudentsService,
	updateStudentService,
} from "../services/student.service.js";

export async function getAllStudents(request, reply) {
	try {
		const students = await getAllStudentsService();
		reply.status(200).send(students);
	} catch (error) {
		reply
			.status(500)
			.send({ message: "Failed to get students", error: error.message });
	}
}

export async function createNewStudent(request, reply) {
	const studentData = request.body;
	try {
		const student = await createStudentService(studentData);
		reply.status(201).send(student);
	} catch (error) {
		reply
			.status(500)
			.send({ message: "Failed to create new student", error: error.message });
	}
}

export async function deleteStudent(request, reply) {
	const studentId = request.params.id;
	try {
		const result = await deleteStudentService(studentId);

		if (result === 0) {
			return reply
				.status(404)
				.send({ message: `Student ${studentId} not found` });
		}

		reply.status(200).send({
			message: `Student ${studentId} deleted successfully`,
		});
	} catch (error) {
		reply.status(500).send({
			message: `Failed to delete student ${studentId}`,
			error: error.message,
		});
	}
}

export async function updateStudent(request, reply) {
	const studentData = request.body;
	const studentId = request.params.id;

	try {
		const student = await updateStudentService(studentId, studentData);
		reply.status(200).send(student);
	} catch (error) {
		reply.status(500).send({
			message: `Failed to update student ${studentId}`,
			error: error.message,
		});
	}
}
