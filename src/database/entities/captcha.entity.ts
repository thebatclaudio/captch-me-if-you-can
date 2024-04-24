import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

/**
 * Captcha entity.
 */
@Entity({ name: "captcha" })
export class Captcha {
	@PrimaryGeneratedColumn("uuid")
	id!: string

	@Column({ type: "text" })
	data_uri!: string

	@Column({ type: "varchar" })
	text!: string

	@CreateDateColumn()
	created_at!: Date

	@UpdateDateColumn()
	updated_at!: Date
}
