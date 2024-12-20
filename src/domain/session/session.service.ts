import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ISession, ISessionRepository, ISessionService, IStartSessionPayload, ITokenPairs, SESSION_REPOSITORY } from "./typing";
import { CacheService, JwtService } from "src/libs";
import * as _ from "lodash"
import { In } from "typeorm";

@Injectable()
export class SessionService implements ISessionService{
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository:ISessionRepository
    constructor(
        private readonly jwtService:JwtService,
        private readonly cacheService:CacheService
        ){}
    public async start(payload:IStartSessionPayload){
        const session = this.sessionRepository.create({
            accessToken:'',
            refreshToken:'',
            deviceName:payload.deviceName,
            userId:payload.userId
        })
        const result = await this.sessionRepository.save(session)
        const sessionId = result.id as string
        const tokens =  this.generateTokens(payload.userId,sessionId)
        await this.sessionRepository.update(sessionId,tokens)
        return {
            ...session,
            ...tokens
        }
    }
    public getByUserId(userId: string): Promise<ISession[]> {
        return this.sessionRepository.findBy({userId})
    }
    public async getSessionByTokens(refreshToken: string[], selectFields?: string[]): Promise<ISession[]> {
        if(!_.isArray(refreshToken) || !refreshToken.length) return []
        const query = this.sessionRepository
        .createQueryBuilder("it")
        .where("it.refreshToken = ANY(:refreshToken)",{refreshToken})

        if (!_.isEmpty(selectFields)) {
			query.select(_.map(selectFields, it => `it.${it}`))
		}
        return query.getMany()
    }
    public async refresh(token: string): Promise<ITokenPairs> {
        const session = await this.sessionRepository.findOneBy({refreshToken:token})
        if(!session) throw new BadRequestException()
        const tokens = this.generateTokens(session.userId,session.id || '')
        await this.sessionRepository.save({
            id:session.id,
            userId:session.userId,
            ...tokens
        })
        return tokens
    }
    public async finish(id: string) {
        const session = await this.sessionRepository.findOneBy({userId:id})
        if(!session) throw new NotFoundException("here")
        await this.delete(session)
    return {msg:"session is finished"}
    }
    public async finishByToken(token:string): Promise<void> {
        const session = await this.sessionRepository
        .createQueryBuilder("it")
        .where("it.refreshToken = :token",{token})
        .orWhere("it.accessToken = :token",{token})
        .getOne()
        if(!session) throw new NotFoundException("here")
        await this.delete(session)
    }

    public async closeAllUserSessions(userId: string, excludeIds?: string[]): Promise<void> {
        const query = this.sessionRepository
        .createQueryBuilder("it")
        .select(["id","accessToken"])
        .where("it.userId = :userId",{userId})
        
        if(!_.isEmpty(excludeIds)){
            query.andWhere("it.id <> ANY(:excludeIds)",{excludeIds})
        }
        const sessions = await query.getMany()
        // console.log(sessions)
        const ids = _.map(sessions,'id')
        
		if (!sessions?.length) return
        await this.sessionRepository.delete({id:In(ids)})        
    }

    public async checkTokenDeprecation(token:string){
        const exist = await this.cacheService.get(token)
        return Boolean(exist)
    }
    private async delete(session:ISession){
        await this.sessionRepository.delete(session.id as string)
    }
    private generateTokens(userId:string,sessionId:string){
       return {
        accessToken: this.jwtService.createToken({id:userId,sessionId}),
        refreshToken: this.jwtService.createToken({
            id:`_${userId}`,
            sessionId,
            expiresIn:null
            })
       } 
    }
}
