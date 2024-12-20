import { IsString } from "class-validator";
import { DtoProperty } from "src/shared";

export class RefreshTokenPayloadDto{
    @DtoProperty()
	@IsString()
    refreshToken:string
}