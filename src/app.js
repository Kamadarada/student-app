import studentRoutes from "./routes/student.routes.js";
import disciplineRoutes from "./routes/discipline.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify = Fastify({
	logger: false,
});

await fastify.register(cors, {
	origin: "http://localhost:3000",
});

//health check
fastify.get("/health", (request, reply) => {
	return reply.status(200).send({ message: "Server is healthy!" });
});

//routes register and prefix
fastify.register(studentRoutes, { prefix: "/api/students" });
fastify.register(disciplineRoutes, { prefix: "/api/disciplines" });
fastify.register(enrollmentRoutes, { prefix: "/api/enrollments" });


export default fastify;
