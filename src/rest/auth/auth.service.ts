import { BadRequestException, Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { IUserRepository, SESSION_SERVICE, SessionService, USER_REPOSITORY, USER_SERVICE, UserRole, UserService } from "src/domain";
import { AdminLoginPayloadDto, LogoutPayloadDto, RefreshTokenPayloadDto } from "./dto";
import * as _ from "lodash"

export class AdminAuthService{
    constructor(
        @Inject(USER_REPOSITORY) private readonly usersRepository:IUserRepository,
        @Inject(USER_SERVICE) private readonly usersService:UserService,
        @Inject(SESSION_SERVICE) private readonly sessionsService:SessionService
    ){}
    public async signIn(dto:AdminLoginPayloadDto){
        const user = await this.usersRepository.findOneBy({
			email: dto.email,
			role: UserRole.Admin,
		})
		if (!user) throw new UnauthorizedException()

		const isCorrect = await this.usersService.compareUserPassword(user.id, dto.password)
		if (!isCorrect) throw new BadRequestException()

		const session = await this.sessionsService.start({
			userId: user.id,
			deviceName: dto.deviceName,
		})
		return { accessToken: session.accessToken, refreshToken: session.refreshToken } 
    }
    public async logout(dto: LogoutPayloadDto) {
		await this.sessionsService.finishByToken(dto.refreshToken)
	}

	public async refreshToken(dto: RefreshTokenPayloadDto) {
		const sessions = await this.sessionsService.getSessionByTokens([dto.refreshToken])
		if (_.isEmpty(sessions)) throw new NotFoundException()

		const user = await this.usersRepository.findOneBy({ id: sessions[0].userId })
		if (!user) throw new NotFoundException()
		return await this.sessionsService.refresh(dto.refreshToken)
	}

}