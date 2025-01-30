import {
	createEnrollmentService,
	deleteEnrollmentService,
	getAllEnrollmentsService,
	updateEnrollmentService,
} from "../services/enrollment.service.js";

export async function createNewEnrollment(request, reply) {
	const enrollmentData = request.body; 
	try {
		const enrollment = await createEnrollmentService(enrollmentData);
		reply.status(201).send(enrollment); 
	} catch (error) {
		reply.status(500).send({
			message: "Failed to create new enrollment",
			error: error.message,
		});
	}
}

export async function getAllEnrollments(request, reply) {
	try {
		const enrollments = await getAllEnrollmentsService();
		reply.status(200).send(enrollments); 
	} catch (error) {
		reply
			.status(500)
			.send({ message: "Failed to get enrollments", error: error.message });
	}
}

export async function deleteEnrollment(request, reply) {
	const enrollmentId = request.params.id; 
	try {
		const result = await deleteEnrollmentService(enrollmentId);

		if (result === 0) {
			return reply
				.status(404)
				.send({ message: `Enrollment ${enrollmentId} not found` });
		}

		reply.status(200).send({
			message: `Enrollment ${enrollmentId} deleted successfully`,
		});
	} catch (error) {
		reply.status(500).send({
			message: `Failed to delete enrollment ${enrollmentId}`,
			error: error.message,
		});
	}
}

export async function updateEnrollment(request, reply) {
	const enrollmentId = request.params.id;
	const enrollmentData = request.body;

	try {
		const enrollment = await updateEnrollmentService(
			enrollmentId,
			enrollmentData,
		);
		reply.status(200).send(enrollment); 
	} catch (error) {
		reply.status(500).send({
			message: `Failed to update enrollment ${enrollmentId}`,
			error: error.message,
		});
	}
}
