import { IsString } from "class-validator";
import { DtoProperty } from "src/shared";

export class SignInDto{
    @DtoProperty()
	@IsString()
	deviceName: string

	@DtoProperty()
	@IsString()
	login: string

	@DtoProperty()
	@IsString()
	password: string
}