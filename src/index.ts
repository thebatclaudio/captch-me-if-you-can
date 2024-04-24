import Fastify from "fastify"
import App from "./app"

async function start(): Promise<void> {
	const fastify = Fastify({
		logger: true
	})

	const port = process.env.PORT || 8080
	const address = process.env.ADDRESS || "0.0.0.0"

	await fastify.register(App)

	await fastify.listen({
		host: address,
		port: parseInt(port.toString(), 10)
	})
}

start()
	.then(() => {
		console.error("start app...")
	})
	.catch(err => {
		console.error(err)
		process.exit(1)
	})
