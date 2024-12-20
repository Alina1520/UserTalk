import { IsString } from "class-validator";
import { DtoProperty } from "src/shared";

export class CreatePersonalChatPayloadDto {
	@DtoProperty()
	@IsString()
	userId: string
}