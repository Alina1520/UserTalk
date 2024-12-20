import { ChatMemberRole, ChatMessageType, ChatType } from "../enum"
import { IChat, IChatMessage } from "./chat.interface"

export interface IChatService{
    create(payload:ICreateChatPayload,userId:string):Promise<IChat>
    update(payload:IUpdateChatPayload,userId:string):Promise<IChat>
    delete(id:string):Promise<void>
    mute(userId:string,chatId:string):Promise<void>
    unmute(userId:string,chatId:string):Promise<void>
}

export interface ICreateChatPayload {
	type: ChatType
	usersIds: string[]
	name?: string
	font?: string
	color?: string
}

export interface IUpdateChatPayload {
	name?: string
	font?: string
	color?: string
	photoUrl?: string
}

export interface ICreateChatPayload {
	type: ChatType
	usersIds: string[]
	name?: string
	font?: string
	color?: string
}

export interface IUpdateChatPayload {
	name?: string
	font?: string
	color?: string
	photoUrl?: string
}

export interface IChatMembersService {
	add(payload: IAddMemberToChatPayload): Promise<void>
	addMany(userId: string, payload: IAddManyMembersToChatPayload): Promise<void>
	delete(memberId: string | string[]): Promise<void>
}

export interface IAddManyMembersToChatPayload {
	chatId: string
	userIds: string[]
}

export interface IAddMemberToChatPayload {
	chatId: string
	userId: string
	authorId: string
	role?: ChatMemberRole
}

export interface IChatMessagesService {
	add(userId: string, payload: IAddChatMessagePayload): Promise<IChatMessage>
	delete(id: string, onlyForUserId?: string): Promise<void>
}

export interface IAddChatMessagePayload {
	chatId: string
	type: ChatMessageType
	content: Record<string, string>
	uniqueKey?: string
	isPost?: boolean
}


