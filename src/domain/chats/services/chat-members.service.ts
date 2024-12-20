import { Inject, Injectable } from "@nestjs/common";
import { ChatMemberRole, IAddManyMembersToChatPayload, IAddMemberToChatPayload, IChatMembersRepository, IChatMembersService } from "../typing";
import { CHATS_MEMBERS_REPOSITORY } from "../typing/consts";

@Injectable()
export class ChatMembersService implements IChatMembersService{
    @Inject(CHATS_MEMBERS_REPOSITORY)
    private readonly chatMembersRepository:IChatMembersRepository

    public async add(payload: IAddMemberToChatPayload): Promise<void> {
        const exist = await this.checkExist(payload.userId,payload.chatId)
        if(exist) return 
        const entity = this.chatMembersRepository.create(payload)
        await this.chatMembersRepository.save(entity)
    }
    public async addMany(userId: string, payload: IAddManyMembersToChatPayload): Promise<void> {
        for await (const id of payload.userIds){
            await this.add({
                chatId:payload.chatId,
                userId:id,
                role: id===userId ? ChatMemberRole.Admin : ChatMemberRole.Member,
                authorId:userId
            })
        }
    }
    private async checkExist(userId:string,chatId:string){
        const exist = await this.chatMembersRepository.findOneBy({userId,chatId})
        return Boolean(exist)

    }
    public async delete(memberId: string | string[]): Promise<void> {
        await this.chatMembersRepository.delete(memberId)        
    }

}