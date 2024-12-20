import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from 'typeorm'
import { ChatType, IChat } from '../typing'
import { BaseEntity } from 'src/shared'
import { ChatMember } from './chat-member.entity'
import { ChatMessage } from './chat-message.entity'

@Entity('chats')
export class Chat extends BaseEntity implements IChat {
	@Column({ type: 'varchar', nullable: true })
	name: string

	@Column({ type: 'varchar', nullable: true })
	photoUrl: string

	@Column({ type: 'varchar', nullable: false })
	type: ChatType

	@Column()
	authorId: string

	@Column({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	lastMessageDate: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string

	@OneToMany(() => ChatMember, chatMember => chatMember.chat)
	chatMembers: ChatMember[]

	@OneToMany(() => ChatMessage, chatMessage => chatMessage.chat)
	chatMessages: ChatMessage[]

	@Column({
		type: 'jsonb',
		nullable: true,
	})
	mutedBy: string
}
