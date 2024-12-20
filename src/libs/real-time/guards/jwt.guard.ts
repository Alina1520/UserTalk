import { CanActivate, ExecutionContext } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { JwtService } from "src/libs/jwt";
import { Events } from "src/shared";

export class JwtWsGuard implements CanActivate{
    constructor(
        private readonly jwtCoreService:JwtService,
        private readonly eventEmitter:EventEmitter2
        ){}
    canActivate(context: ExecutionContext): boolean {
        try{
            const data = context.switchToWs().getData()
            const token = this.extractToken(data)
            const decodedToken = this.jwtCoreService.decodeToken(token)
            if(!decodedToken){
                const socket = context.switchToHttp().getRequest()
                this.eventEmitter.emit(Events.OnErrorJoinUser,{
                    socket
                })
                throw new Error()
            }
            data.user = decodedToken
            return true
        }catch(e){
            return false
        }   
    }

    private extractToken(data: any) {
		const authHeader = data.headers.authorization
		const authToken = authHeader.substring(7, authHeader.length)
		return authToken
	}

}