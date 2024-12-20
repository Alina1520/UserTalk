import { Inject, Injectable } from "@nestjs/common";
import { ChatMessageType, IAddChatMessagePayload, IChatMessage, IChatMessageDeleted, IChatMessagesRepository, IChatMessagesService, IChatsMessagesDeletedRepository } from "../typing";
import { CHATS_MESSAGES_DELETED, CHATS_MESSAGES_REPOSITORY } from "../typing/consts";

@Injectable()
export class ChatMessagesService implements IChatMessagesService{
    @Inject(CHATS_MESSAGES_DELETED) private readonly chatMessagesDeleted : IChatsMessagesDeletedRepository
    @Inject(CHATS_MESSAGES_REPOSITORY) private readonly chatMessagesRepository:IChatMessagesRepository

    public async add(userId: string, payload: IAddChatMessagePayload): Promise<IChatMessage> {
        const message = this.chatMessagesRepository.create({
            chatId:payload.chatId,
            type:payload.type,
            uniqueKey:payload.uniqueKey,
            userId,
            isPost:payload.isPost,
            content:payload.content
        })
        await this.chatMessagesRepository.save(message)
        return message
    }
    
    public async  delete(id: string, onlyForUserId?: string): Promise<void> {
        if(onlyForUserId) await this.removeForOne(id,onlyForUserId)
        else await this.removeForAll(id)
    }

    private async removeForAll(id: string){
        await this.chatMessagesRepository.update(id,{
            content:JSON.stringify({}),
            type:ChatMessageType.Deleted
        })
    }
    private async removeForOne(id: string,userId:string){
        const message = await this.chatMessagesRepository.findOneBy({id})
        if(!message) return 
        await this.chatMessagesDeleted.save({
            userId:userId,
            chatId:message.chatId,
            messageId:message.id
        })
    }

}