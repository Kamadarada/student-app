import "dotenv/config";
import fastify from "./app.js";

const PORT = process.env.PORT;

fastify.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	fastify.log.info(`Server listening on ${address}`);
});
