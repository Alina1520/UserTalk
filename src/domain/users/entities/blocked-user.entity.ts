import { BaseEntity } from 'src/shared'
import {
	Column,
	CreateDateColumn,
	Entity,
	UpdateDateColumn,
} from 'typeorm'
import { IBlockedUser } from '../typing'

@Entity('blockedUsers')
export class BlockedUser extends BaseEntity implements IBlockedUser {
	@Column()
	userId: string

	@Column()
	blockedUserId: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string
}
