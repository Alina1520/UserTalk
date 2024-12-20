 import {
	AfterSoftRemove,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	UpdateDateColumn,
} from 'typeorm'
import { IUser, UserRole, UserStatus } from '../typing'
import { BaseEntity } from 'src/shared'
import { UserSetting } from './user-setting.entity'

@Entity('users')
export class User extends BaseEntity implements IUser {
	@Column({ type: 'varchar', nullable: false, default: UserRole.User })
	role: UserRole

	@Column({ type: 'varchar', nullable: false, default: UserStatus.Active })
	status: UserStatus

	@Column({ nullable: true })
	firstName: string

	@Column({ nullable: true })
	lastName: string

	@Column({ nullable: false, unique: true })
	login: string

	@Column({ nullable: true })
	email: string

	@Column({ nullable: true })
	about: string

	@Column({ nullable: false, unique: true })
	phoneNumber: string

	@Column({ type: 'varchar', nullable: true, select: false })
	password: string

	@Column({ type: 'varchar', nullable: true, select: false })
	passwordSalt: string

	@Column({ type: 'varchar', nullable: true })
	avatarUrl?: string

	@Column({ type: 'varchar', nullable: false, default: false })
	'2faRequired': boolean

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string

	@OneToMany(() => UserSetting, setting => setting.user)
	settings?: UserSetting[]
}
