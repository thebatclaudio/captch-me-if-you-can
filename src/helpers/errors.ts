import { type FastifyReply } from "fastify"

/**
 * Handle generic server error.
 *
 * @param reply
 * @param error
 * @returns
 */
export function handleServerError(reply: FastifyReply) {
	return reply.status(500).send({
		status_code: 500,
		message: "Internal server error"
	})
}
