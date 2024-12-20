import { IsString } from "class-validator"
import { DtoProperty } from "src/shared"

export class TokenPairDto{
    @DtoProperty()
    @IsString()
    accessToken:string
    
    @DtoProperty()
    @IsString()
    refreshToken:string
}