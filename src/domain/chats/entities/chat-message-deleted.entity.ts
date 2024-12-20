import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { IChatMessageDeleted } from '../typing'
import { ChatMessage } from './chat-message.entity'

@Entity('chatsMessagesDeleted')
export class ChatMessageDeleted implements IChatMessageDeleted {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	messageId: string

	@Column()
	userId: string

	@Column()
	chatId: string

	@ManyToOne(() => ChatMessage, chatMessage => chatMessage.deleted, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'messageId' })
	message: ChatMessage

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string
}
