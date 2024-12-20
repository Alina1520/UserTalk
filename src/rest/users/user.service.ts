import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ISessionService, IUserRepository, IUserService, SESSION_SERVICE, SessionService, USER_REPOSITORY, USER_SERVICE, UserRole, UserService } from "src/domain";
import { CreateUserPayloadDto, RefreshTokenDto, SignInDto } from "./dto";

@Injectable()
export class RestUserService {
        @Inject(USER_SERVICE)
        private readonly userService:IUserService
        @Inject(SESSION_SERVICE)
        private readonly sessionService:ISessionService
        @Inject(USER_REPOSITORY)
        private readonly userRepository:IUserRepository
   

    public async signUp(dto:CreateUserPayloadDto){
        const user = await this.userService.create(dto)
        return user.id        
    }
    
    public async signIn(dto:SignInDto){
        const user = await this.userRepository.findOneBy({login:dto.login})
        if(!user) throw new NotFoundException()

        const password = await this.userService.compareUserPassword(dto.password,user.id)
        if(!password) throw new BadRequestException("password")

        const session = await this.sessionService.start({
            userId:user.id,
            deviceName:dto.deviceName
        })

        return {accessToken:session.accessToken,refreshToken:session.refreshToken}
    }

    public async logout(id:string){
      return  await this.sessionService.finish(id)
    }
    public async logoutByToken(dto:RefreshTokenDto){
        return await this.sessionService.finishByToken(dto.refreshToken)
    }
}