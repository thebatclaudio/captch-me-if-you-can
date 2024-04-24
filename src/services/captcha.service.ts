import { type Repository } from "typeorm"
import { Captcha } from "../database/entities"
import { createCanvas } from "canvas"

/**
 * Class CaptchaService.
 */
export class CaptchaService {
	/**
	 * Generate a captcha image with a random string.
	 *
	 * @returns
	 */
	private static generateCaptcha(): { text: string; dataUrl: string } {
		const width = 150
		const height = 50
		const canvas = createCanvas(width, height)
		const ctx = canvas.getContext("2d")

		ctx.fillStyle = "#eeeeee"
		ctx.fillRect(0, 0, width, height)

		for (let i = 0; i < 6; i++) {
			ctx.strokeStyle = this.randomColor()
			ctx.beginPath()
			ctx.moveTo(this.randomNumber(0, width), this.randomNumber(0, height))
			ctx.lineTo(this.randomNumber(0, width), this.randomNumber(0, height))
			ctx.stroke()
		}

		const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
		let text = ""
		for (let i = 0; i < 6; i++) {
			const char = chars.charAt(Math.floor(Math.random() * chars.length))
			text += char

			ctx.font = `${this.randomNumber(24, 32)}px Arial`
			ctx.fillStyle = this.randomColor()
			ctx.fillText(char, 5 + i * 25, this.randomNumber(30, 45))
		}

		const dataUrl = canvas.toDataURL()

		return {
			text,
			dataUrl
		}
	}

	/**
	 * Generate a random number between `min` and `max`.
	 *
	 * @param min
	 * @param max
	 * @returns
	 */
	private static randomNumber(min: number, max: number): number {
		return Math.random() * (max - min) + min
	}

	/**
	 * Generate a random color.
	 *
	 * @returns
	 */
	private static randomColor(): `rgb(${number},${number},${number})` {
		const r = Math.floor(Math.random() * 256)
		const g = Math.floor(Math.random() * 256)
		const b = Math.floor(Math.random() * 256)
		return `rgb(${r},${g},${b})`
	}

	/**
	 * Generate a captcha image and save it on DB.
	 *
	 * @param repository
	 * @returns
	 */
	public static createCaptcha(repository: Repository<Captcha>): Promise<Captcha> {
		const generatedCaptcha = this.generateCaptcha()

		const newCaptchaEntity = new Captcha()
		newCaptchaEntity.data_uri = generatedCaptcha.dataUrl
		newCaptchaEntity.text = generatedCaptcha.text

		const createdCaptcha = repository.save(newCaptchaEntity)

		return createdCaptcha
	}

	/**
	 * Get captcha by ID from DB.
	 *
	 * @param repository
	 * @param params
	 * @returns
	 */
	public static getCaptcha(repository: Repository<Captcha>, params: any): Promise<Captcha | null> {
		return repository.findOneBy({
			id: params.id
		})
	}

	/**
	 * Validate a captcha using ID and text.
	 *
	 * @param repository
	 * @param params
	 * @param body
	 * @returns
	 */
	public static validateCaptcha(repository: Repository<Captcha>, params: any, body: any): Promise<Captcha | null> {
		const captcha = repository.findOneBy({
			id: params.id,
			text: body.text
		})

		return captcha
	}
}
