export interface IContact {
	id: string
	userId: string
	targetId?: string
	phoneNumber: string
	firstName?: string
	lastName?: string
	isAccess: boolean
	mute: boolean
}
