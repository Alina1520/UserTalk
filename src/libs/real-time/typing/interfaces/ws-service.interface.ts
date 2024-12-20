export interface IWSService {
	isUserOnline(userId: string): boolean
	getUsersOnlineCount(): Promise<number>
	emitToRoom(room: string, key: string, data?: any): void
	getUsersOnlineIds(): Promise<string[]>
	emitToUser(userId: string, key: string, data?: any): void
	emitToAll(key: string, data?: any): void
	emitToGroup(groupId: string | string[], key: string, data?: any): void
}
