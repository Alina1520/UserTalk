import { Inject, Injectable } from "@nestjs/common";
import { ChatType, ChatsSocketEvents, IChatMembersRepository, IChatRepository, IChatService } from "src/domain/chats";
import { CHATS_MEMBERS_REPOSITORY, CHATS_REPOSITORY, CHATS_SERVICE } from "src/domain/chats/typing/consts";
import { WsService } from "src/libs";
import { CreatePersonalChatPayloadDto } from "../dto";

@Injectable()
export class RestChatService{
    @Inject(CHATS_REPOSITORY) private readonly chatRepository:IChatRepository
    @Inject(CHATS_SERVICE) private readonly chatService:IChatService
    @Inject(CHATS_MEMBERS_REPOSITORY) private readonly membersRepository:IChatMembersRepository
    constructor(private readonly wsService:WsService){}

    public async createPersonalChat(userId:string,dto:CreatePersonalChatPayloadDto){
        const existingChat = await this.getPersonalChatBetweenUsers(userId,dto.userId)
        if(existingChat) return existingChat.id
        const chat = await this.chatService.create({
            type:ChatType.Personal,
            usersIds:[dto.userId]
        },userId)
        await this.chatEmitSocket(ChatsSocketEvents.NewChat,{
            chatId:chat.id,
            events:ChatsSocketEvents.NewChat
        })
        return chat.id
    }
    
    private async getChatMembers(chatId:string){
        const query = await this.membersRepository
        .createQueryBuilder("it")
        .where("it.chatId = :chatId",{chatId})
        .getMany()
        return query
    }
  
	private async getPersonalChatBetweenUsers(userId: string, targetUserId: string) {
		const chatBetweenUsers = await this.chatRepository
			.createQueryBuilder('it')
			.where('it.type = :type', { type: ChatType.Personal })
			.innerJoin('it.chatMembers', 'member1', 'member1.userId = :userId', {
				userId,
			})
			.innerJoin('it.chatMembers', 'member2', 'member2.userId = :targetUserId', {
				targetUserId,
			})
			.getOne()
		return chatBetweenUsers
	}
    private async chatEmitSocket(keyEvent:ChatsSocketEvents,data:any){
        const onlineUsersIds = await this.wsService.getUsersIdsOnline()
        if(!onlineUsersIds) return 

        const chatMembers = await this.getChatMembers(data.chatId)
        if(!chatMembers) return 

        const members = chatMembers.map(it=>it.userId)
        const membersOnline = onlineUsersIds.filter(id=>members.includes(id))
        membersOnline.forEach(id=>{
            this.wsService.emitToUser(id,keyEvent,data)
        })
    }
}