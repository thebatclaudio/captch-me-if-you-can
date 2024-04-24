import plugin from "typeorm-fastify-plugin"
import { Captcha } from "./database/entities/index"
import type { FastifyInstance } from "fastify"

export function configureDatabase(server: FastifyInstance) {
	server.register(plugin, {
		type: "sqlite",
		database: `./database/db.sqlite`,
		entities: [Captcha],
		logging: true,
		synchronize: true
	})
}
