import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "src/libs";
import { removeBearerFromHeader } from "src/shared";
import { SESSION_SERVICE } from "../typing";
import { SessionService } from "../session.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
		private readonly jwtService: JwtService,
    @Inject(SESSION_SERVICE)
    private readonly sessionService:SessionService){}
    public async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest()
        const {headers} = request

        const token = removeBearerFromHeader(headers.authorization)
        if(!token) throw new UnauthorizedException()

        const deprecated = await this.sessionService.checkTokenDeprecation(token)
	    	if (deprecated) throw new UnauthorizedException()

        const decoded = this.jwtService.decodeToken(token)
        request.userId = decoded.id
        request.sessionId = decoded.sessionId
        return true
    }

}