import { BaseEntity } from 'src/shared'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { ChatMemberRole, IChatMember } from '../typing'
import { Chat } from './chat.entity'
import { User } from 'src/domain/users/entities/user.entity'

@Entity('chatsMembers')
export class ChatMember extends BaseEntity implements IChatMember {
	@Column()
	chatId: string

	@Column({ nullable: true })
	userId: string

	@ManyToOne(() => User, { onDelete: 'SET NULL' })
	@JoinColumn()
	user: User

	@Column({ type: 'varchar', default: ChatMemberRole.Member })
	role: ChatMemberRole

	@Column()
	authorId: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@ManyToOne(() => Chat, chat => chat.chatMembers, { onDelete: 'CASCADE' })
	@JoinColumn()
	chat: Chat
}
