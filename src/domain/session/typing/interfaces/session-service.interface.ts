import { ITokenPairs } from "../dto"
import { ISession } from "./session.interface"

export interface ISessionService{
    start(payload:IStartSessionPayload):Promise<ISession>
    getByUserId(userId:string):Promise<ISession[]>
    getSessionByTokens(refreshToken:string[],selectFields?:string[]):Promise<ISession[]>
    refresh(token:string):Promise<ITokenPairs>
    finish(id:string)
    finishByToken(token:string):Promise<void>
    closeAllUserSessions(userId:string,excludeIds?:string[]):Promise<void>
    checkTokenDeprecation(token:string):Promise<boolean>
}

export interface IStartSessionPayload {
	userId: string
	deviceName: string
}