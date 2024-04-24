import type { FastifyInstance } from "fastify"
import { CaptchaController } from "../controllers/index"

export default async function (fastify: FastifyInstance): Promise<void> {
	fastify.route({
		url: "/captcha",
		method: "GET",
		handler: CaptchaController.createCaptcha
	})

	fastify.route({
		url: "/captcha/:id",
		method: "GET",
		handler: CaptchaController.getCaptcha
	})

	fastify.route({
		url: "/captcha/:id/validate",
		method: "POST",
		handler: CaptchaController.validateCaptcha
	})
}
