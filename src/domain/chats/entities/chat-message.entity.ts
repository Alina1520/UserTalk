import { BaseEntity } from 'src/shared'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { ChatMessageType, IChatMessage } from '../typing'
import { Chat } from './chat.entity'
import { ChatMessageRead } from './chat-message-read.entity'
import { ChatMessageDeleted } from './chat-message-deleted.entity'
import { User } from 'src/domain/users/entities'

@Entity('chatsMessages')
export class ChatMessage extends BaseEntity implements IChatMessage {
	@Column()
	chatId: string

	@Column({ nullable: true })
	userId: string

	@ManyToOne(() => User, { onDelete: 'SET NULL' })
	@JoinColumn()
	user: User

	@Column({ type: 'varchar' })
	type: ChatMessageType

	@Column({
		type: 'jsonb',
	})
	content: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@ManyToOne(() => Chat, chat => chat.chatMessages, { onDelete: 'CASCADE' })
	@JoinColumn()
	chat: Chat

	@OneToMany(() => ChatMessageRead, read => read.message)
	views: ChatMessageRead[]

	@Column({ nullable: true })
	uniqueKey: string

	@Column({ nullable: false, default: false })
	isPost: boolean

	@OneToMany(() => ChatMessageDeleted, deleted => deleted.message)
	deleted: ChatMessageDeleted[]
}
