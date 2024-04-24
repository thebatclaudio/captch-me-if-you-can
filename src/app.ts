import type { FastifyInstance, FastifyPluginOptions } from "fastify"
import api from "./routes/index"
import { configureDatabase } from "./db.config"

export default async function (fastify: FastifyInstance, opts: FastifyPluginOptions): Promise<void> {
	fastify.register(api, opts)

	configureDatabase(fastify)
}
