import { BaseEntity } from 'src/shared'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm'
import { IGroup } from '../typing/interfaces'
import { GroupStatus } from '../typing'
import { Chat, IChat } from 'src/domain/chats'

@Entity('groups')
export class Group extends BaseEntity implements IGroup {
	@Column({ type: 'varchar', nullable: false })
	name: string

	@Column({ type: 'varchar', default: GroupStatus.WaitingFirstPost })
	status: GroupStatus

	@Column({ nullable: true })
	avatarUrl?: string

	@Column({ nullable: true })
	chatId?: string

	@ManyToOne(() => Chat, { onDelete: 'NO ACTION', onUpdate: 'CASCADE' })
	@JoinColumn({ name: 'chatId' })
	chat?: IChat

	@Column({ type: 'json', nullable: true })
	styleSettings: {
		fontFamily?: string
		color?: string
	}

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string
}
