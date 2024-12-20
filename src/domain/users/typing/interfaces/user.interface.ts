import { UserRole, UserStatus } from "../enums"

export interface IUser {
	id: string
	role: UserRole
	status: UserStatus
	firstName: string
	lastName: string
	login: string
	email: string
	about: string
	phoneNumber: string
	password: string
	passwordSalt?: string
	avatarUrl?: string | null
	'2faRequired'?: boolean
	createdAt: string
	updatedAt: string
}

export interface IUserSetting {
	userId: string
	key: string
	value: string
}

export interface IBlockedUser {
	id: string
	userId: string
	blockedUserId: string
	createdAt: string
	updatedAt: string
}

export interface IUserLocation {
	userId: string
	lat: number
	long: number
	createdAt: string
	updatedAt: string
}