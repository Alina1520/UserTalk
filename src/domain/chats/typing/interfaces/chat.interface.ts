import { IUser } from "src/domain/users"
import { ChatMemberRole, ChatMessageType, ChatType } from "../enum"
import { IGroup } from "src/domain/group"

export interface IChat {
	id: string
	name: string
	photoUrl: string | null
	type: ChatType
	authorId: string
	lastMessageDate: string
	mutedBy: string
	createdAt: string
	updatedAt: string

	chatMembers?: IChatMember[]
	lastMessage?: IChatMessage | null
	unreadMessagesCount?: number
	isMuted?: boolean
	group?: IGroup | null
	firstMessageId?: string | null
	lastMessageId?: string | null
}

export interface IChatMember {
	id: string
	chatId: string
	userId: string
	role: ChatMemberRole
	authorId: string
	createdAt: string

	user?: Partial<IUser>
}
export interface IChatMessage {
	id: string
	chatId: string
	userId: string
	type: ChatMessageType
	content: string | Record<string, any>
	createdAt: string
	uniqueKey: string
	isPost: boolean

	views?: IChatMessageRead[]
	isRead?: boolean
	authorName?: string

	user?: IUser
}
export interface IChatMessageRead {
	userId: string
	messageId: string
	createdAt: string
}

export interface IAudio {
	audioMessageId: string
	duration: number
	minDecibel: number
	maxDecibel: number
	meteringConfig: string | number[]
}

export interface ILink {
	linkMessageId: string
	linkUrl: string
	title: string
	description: string
	imageUrl: string
}

export interface IChatMessageDeleted {
	id: number
	userId: string
	messageId: string
	chatId: string
	createdAt: string
}