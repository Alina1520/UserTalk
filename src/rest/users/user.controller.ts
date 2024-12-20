import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { RestUserService } from "./user.service";
import { CreateUserPayloadDto, RefreshTokenDto, SignInDto, TokenPairDto } from "./dto";
import { AuthGuard } from "src/domain";
import { ReqUser } from "src/shared";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("User | Auth")
@Controller("users")
export class RestUserController{
    constructor(private readonly userService:RestUserService){}

    @ApiOperation({summary:"User sign up"})
    @ApiBody({type:CreateUserPayloadDto})
    @ApiOkResponse({
        status:201,
        description:"returns user`s id"
    })
    @Post("signup")
    public async register(@Body() dto:CreateUserPayloadDto){
        return await this.userService.signUp(dto)        
    }
    @ApiOperation({summary:"User sign in"})
    @ApiBody({type:SignInDto})
    @ApiOkResponse({
        status:201,
        description:"returns access and refresh tokens",
        type:TokenPairDto
    })
    @Post("signin")
    public async signIn(@Body() dto:SignInDto){
        return await this.userService.signIn(dto)
    }
    @ApiOperation({summary:"User logout by id from request"})
    @ApiOkResponse({
        status:201,
        description:"returns a message"
    })
    @AuthGuard()
    @Post("logout")
    public async logout(@ReqUser() userId:string){
        return await this.userService.logout(userId)
    }
    @ApiOperation({summary:"User logout by refresh token"})
    @ApiBody({type:RefreshTokenDto})
    @ApiOkResponse({
        status:201,
        description:"returns nothing"
    })
    @AuthGuard()
    @Post("logoutT")
    public async logoutByToken(@Body() token:RefreshTokenDto){
        return await this.userService.logoutByToken(token)
    }
}