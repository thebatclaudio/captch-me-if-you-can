import type { FastifyInstance } from "fastify"
import captchaRoutes from "./captcha.routes"

export default async function (fastify: FastifyInstance): Promise<void> {
	fastify.register(captchaRoutes)
}
