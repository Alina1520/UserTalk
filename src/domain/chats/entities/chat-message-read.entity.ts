import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { IChatMessageRead } from '../typing'
import { ChatMessage } from './chat-message.entity'

@Entity('chatsMessagesRead')
export class ChatMessageRead implements IChatMessageRead {
	@PrimaryColumn()
	userId: string

	@PrimaryColumn()
	messageId: string

	@ManyToOne(() => ChatMessage, message => message.views, { onDelete: 'CASCADE' })
	@JoinColumn()
	message: ChatMessage

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string
}
