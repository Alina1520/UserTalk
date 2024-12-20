import { UserRole } from "../enums"
import { IUser } from "./user.interface"

export interface IUserService{
    create(payload:IUserCreatePayload):Promise<IUser>
    update(payload:IUpdateUserPayload,userId:string):Promise<IUser>
    delete(id:string):Promise<void>
	compareUserPassword(userId: string, password: string): Promise<boolean>
	changeUserPassword(userId: string, newPassword: string): Promise<void>
}

export interface IUserCreatePayload{
    login: string
	phoneNumber: string
	firstName: string
	lastName?: string
	password: string
	email?: string
	role?: UserRole
}

export interface IUpdateUserPayload {
	firstName?: string
	lastName?: string
	login?: string
	email?: string
	phoneNumber?: string
	avatarUrl?: string
	'2faRequired'?: boolean
}