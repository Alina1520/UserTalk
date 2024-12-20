import { Socket } from 'socket.io'

export enum Events {
	OnUserCreated = 'OnUserCreated',
	OnReadChat = 'OnReadChat',
	OnErrorJoinUser = 'OnErrorJoinUser',
	OnUserConnect = 'OnUserConnect',
	OnUserDisconnect = 'OnUserDisconnect',
	OnUserDeleted = 'OnUserDeleted',
	StopSessions = 'StopSessions',
}

export interface IEventsPayloads {
	OnUserCreated: {
		userId: string
	}
	OnReadChat: {
		userId: string
		chatId: string
	}
	StopSessions: {
		userId: string
		sessionsIds?: string[]
	}
	OnErrorJoinUser: {
		socket: Socket
	}
	OnUserConnect: {
		userId: string
	}
	OnUserDisconnect: {
		userId: string
		deviceUUId?: string
	}
	OnUserDeleted: {
		userId: string
	}
}

