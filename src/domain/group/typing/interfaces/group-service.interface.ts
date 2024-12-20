import { IGroup } from './group.interface'

export interface IGroupsService {
	create(payload: ICreateGroupPayload): Promise<IGroup>
	update(id: string, payload: IUpdateGroupPayload): Promise<IGroup>
	delete(id: string): Promise<void>
}

export interface ICreateGroupPayload {
	name: string
	avatarUrl?: string
	chatId?: string

	fontFamily: string
	fontColor: string
}

export interface IUpdateGroupPayload {
	name?: string
	avatarUrl?: string
	fontFamily?: string
	fontColor?: string
}
