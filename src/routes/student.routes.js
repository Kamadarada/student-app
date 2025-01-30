import {
	createNewStudent,
	deleteStudent,
	getAllStudents,
	updateStudent,
} from "../controllers/student.controller.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const studentParams = z.object({
	id: z.string(),
});

const studentBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	birthDate: z.date(),
	phone: z.string().nullable(),
});

const studentResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email(),
	birthDate: z.date(),
	phone: z.string().nullable(),
});

export default function (fastify, options) {
	fastify.get(
		"/",
		{
			schema: {
				response: {
					200: zodToJsonSchema(z.array(studentResponseSchema)),
				},
			},
		},
		getAllStudents,
	);

	fastify.post(
		"/create",
		{
			schema: {
				body: zodToJsonSchema(studentBodySchema),
				response: {
					201: zodToJsonSchema(studentResponseSchema),
				},
			},
		},
		createNewStudent,
	);

	fastify.delete(
		"/delete/:id",
		{
			schema: {
				params: zodToJsonSchema(studentParams),
				response: {
					200: zodToJsonSchema(z.object({ message: z.string() })),
					404: zodToJsonSchema(z.object({ message: z.string() })),
				},
			},
		},
		deleteStudent,
	);

	fastify.put(
		"/update/:id",
		{
			schema: {
				params: zodToJsonSchema(studentParams),
				body: zodToJsonSchema(studentBodySchema),
				response: {
					200: zodToJsonSchema(studentResponseSchema),
				},
			},
		},
		updateStudent,
	);
}
