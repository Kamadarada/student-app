import {
	createNewDiscipline,
	deleteDiscipline,
	getAllDisciplines,
	updateDiscipline,
} from "../controllers/discipline.controller.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";



const disciplineParams = z.object({
	id: z.string(),
});

const disciplineBodySchema = z.object({
	name: z.string(),
	workload: z.number(),
});



const disciplineResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	workload: z.number(),
});

export default function (fastify, options) {
	fastify.get(
		"/",
		{
			schema: {
				response: {
					200: zodToJsonSchema(z.array(disciplineResponseSchema)),
				},
			},
		},
		getAllDisciplines,
	);

	fastify.post(
		"/create",
		{
			schema: {
				body: zodToJsonSchema(disciplineBodySchema),
				response: {
					201: zodToJsonSchema(disciplineResponseSchema),
				},
			},
		},
		createNewDiscipline,
	);

	fastify.delete(
		"/delete/:id",
		{
			schema: {
				params: zodToJsonSchema(disciplineParams),
				response: {
					200: zodToJsonSchema(z.object({ message: z.string() })),
					404: zodToJsonSchema(z.object({ message: z.string() })),
				},
			},
		},
		deleteDiscipline,
	);

	fastify.put(
		"/update/:id",
		{
			schema: {
				params: zodToJsonSchema(disciplineParams),
				body: zodToJsonSchema(disciplineBodySchema),
				response: {
					200: zodToJsonSchema(disciplineResponseSchema),
					404: zodToJsonSchema(z.object({ message: z.string() })),
				},
			},
		},
		updateDiscipline,
	);
}
