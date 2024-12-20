import { IChat } from "src/domain/chats"
import { GroupStatus } from "../enum"

export interface IGroup {
	id: string
	name: string
	status: GroupStatus
	avatarUrl?: string | null

	chatId?: string
	chat?: IChat

	styleSettings: {
		fontFamily?: string
		color?: string
	}

	settings?: {
		disableLocation: boolean
		mute: boolean
	}

	userAccess?: {
		isMember: boolean
		isFollower: boolean
	}

	statistics?: {
		membersCount: number
		followersCount: number
		likesCount: number
	}

	createdAt?: string
	updatedAt?: string
}
