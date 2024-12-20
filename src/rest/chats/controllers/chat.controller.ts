import { Body, Controller, Post } from "@nestjs/common";
import { RestChatService } from "../services";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/domain";
import { ReqUser } from "src/shared";
import { CreatePersonalChatPayloadDto } from "../dto";

@ApiTags('Chats')
@Controller('chats')
export class RestChatController{
    constructor(private readonly chatService:RestChatService){}
    @ApiOperation({ summary: 'Create personal chat with user' })
	@ApiResponse({
		status: 201,
		description: 'Return personal chat id',
		type: String,
	})
	@AuthGuard()
	@Post('personal-chat')
	public async createPersonalChat(
		@ReqUser() userId: string,
		@Body() dto: CreatePersonalChatPayloadDto,
	) {
		return await this.chatService.createPersonalChat(userId, dto)
	}
}