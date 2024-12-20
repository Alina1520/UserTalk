import { Column, Entity, PrimaryColumn } from 'typeorm'
import { ILink } from '../typing'

@Entity('links')
export class Link implements ILink {
	@PrimaryColumn()
	linkMessageId: string

	@PrimaryColumn()
	linkUrl: string

	@Column({ nullable: true })
	title: string

	@Column({ nullable: true })
	description: string

	@Column({ nullable: true })
	imageUrl: string
}
