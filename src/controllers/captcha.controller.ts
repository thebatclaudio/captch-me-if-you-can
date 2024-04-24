import type { FastifyReply, FastifyRequest } from "fastify"
import { CaptchaService } from "../services"
import { handleServerError } from "../helpers/errors"
import { Captcha } from "../database/entities"

/**
 * Class CaptchaController.
 */
export class CaptchaController {
	/**
	 * Create captcha.
	 *
	 * @param request
	 * @param reply
	 */
	public static async createCaptcha(request: FastifyRequest, reply: FastifyReply) {
		try {
			const captchaRepository = request.server.orm.getRepository(Captcha)
			const generatedCaptcha = await CaptchaService.createCaptcha(captchaRepository)

			reply.send({
				id: generatedCaptcha.id,
				captcha: generatedCaptcha.data_uri
			})
		} catch (err) {
			handleServerError(reply)
		}
	}

	/**
	 * Get captcha by ID.
	 *
	 * @param request
	 * @param reply
	 * @returns
	 */
	public static async getCaptcha(request: FastifyRequest, reply: FastifyReply) {
		try {
			const captchaRepository = request.server.orm.getRepository(Captcha)
			const captcha = await CaptchaService.getCaptcha(captchaRepository, request.params)

			if (!captcha) {
				return reply.callNotFound()
			}

			return reply.send({
				id: captcha.id,
				captcha: captcha.data_uri
			})
		} catch (err) {
			handleServerError(reply)
		}
	}

	/**
	 * Validate captcha.
	 *
	 * @param request
	 * @param reply
	 * @returns
	 */
	public static async validateCaptcha(request: FastifyRequest, reply: FastifyReply) {
		try {
			const captchaRepository = request.server.orm.getRepository(Captcha)
			const captcha = await CaptchaService.validateCaptcha(captchaRepository, request.params, request.body)

			if (!captcha) {
				return reply.send({
					valid: false
				})
			}

			return reply.send({
				valid: true
			})
		} catch (err) {
			handleServerError(reply)
		}
	}
}
