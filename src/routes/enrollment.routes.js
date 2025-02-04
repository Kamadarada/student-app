import {
	createNewEnrollment,
	deleteEnrollment,
	getAllEnrollments,
	getEnrollmentsStudent,
	updateEnrollment,
} from "../controllers/enrollment.controller.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const enrollmentParams = z.object({
	id: z.string(),
});

const enrollmentBodySchema = z.object({
	studentId: z.string(),
	disciplineId: z.string(),
	enrollmentDate: z.date(),
});

const enrollmentResponseSchema = z.object({
	id: z.string(),
	studentId: z.string(),
	disciplineId: z.string(),
	enrollmentDate: z.date(),
});


const enrollmentStudentSchema = z.object({
	disciplineId: z.string(),
	disciplineName: z.string(),
	students: z.array(z.object({
		id: z.string(),
		name: z.string(),
		email: z.string(),
		enrollmentDate: z.date()
	}))
})

export default function (fastify, options) {
	fastify.get(
		"/",
		{
			schema: {
				response: {
					200: zodToJsonSchema(z.array(enrollmentResponseSchema)),
				},
			},
		},
		getAllEnrollments,
	);

	fastify.get("/students", {
		schema: {
			response: {
				200: zodToJsonSchema(z.array(enrollmentStudentSchema))
			}
		}
	} , getEnrollmentsStudent)


	fastify.post(
		"/create",
		{
			schema: {
				body: zodToJsonSchema(enrollmentBodySchema),
				response: {
					201: zodToJsonSchema(enrollmentResponseSchema),
				},
			},
		},
		createNewEnrollment,
	);

	fastify.delete(
		"/delete/:id",
		{
			schema: {
				params: zodToJsonSchema(enrollmentParams),
				response: {
					200: zodToJsonSchema(z.object({ message: z.string() })),
					404: zodToJsonSchema(z.object({ message: z.string() })),
				},
			},
		},
		deleteEnrollment,
	);

	fastify.put(
		"/update/:id",
		{
			schema: {
				params: zodToJsonSchema(enrollmentParams),
				body: zodToJsonSchema(enrollmentBodySchema),
				response: {
					200: zodToJsonSchema(enrollmentResponseSchema),
					404: zodToJsonSchema(z.object({ message: z.string() })),
				},
			},
		},
		updateEnrollment,
	);
}
