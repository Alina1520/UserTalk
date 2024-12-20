import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ChatType, IChat, IChatMembersService, IChatRepository, IChatService, ICreateChatPayload, IUpdateChatPayload } from "../typing";
import {CHATS_MEMBERS_SERVICE, CHATS_REPOSITORY} from "../typing/consts";
import * as _ from "lodash"

@Injectable()
export class ChatService implements IChatService{
        @Inject(CHATS_REPOSITORY) private readonly chatRepository:IChatRepository
        @Inject(CHATS_MEMBERS_SERVICE)  private readonly chatMembersService:IChatMembersService
    
    public async create(payload: ICreateChatPayload, userId: string): Promise<IChat> {
        const entity = this. chatRepository.create({
            authorId:userId,
            type:payload.type,
            name:payload.name
            })
        const chat = await this.chatRepository.save(entity)
        const membersIds = [userId,...payload.usersIds]
        await this.chatMembersService.addMany(userId,{
            chatId:chat.id,
            userIds:membersIds
        })
        return chat        
    }

    public async update(payload: IUpdateChatPayload, chatId: string): Promise<IChat> {
        let chat = await this.chatRepository.findOneBy({id:chatId})
        if(!chat) throw new NotFoundException()
        chat = this.chatRepository.merge(chat,_.omitBy(_.omit(payload),_.isNil))
        console.log("1 ",_.omit(payload))
        console.log("2 ",_.omitBy(_.omit(payload),_.isNil))
        console.log("3 ",_.omitBy(payload,_.isNil))
        await this.chatRepository.save(chat)
        return chat
    }

    public async delete(id: string): Promise<void> {
        await this.chatRepository.delete(id)
    }

    public async mute(userId: string, chatId: string): Promise<void> {
        const chat = await this.chatRepository.findOneByOrFail({id:chatId})
        const mutedByUsers = chat.mutedBy ? JSON.parse(chat.mutedBy) : []
        if(_.includes(mutedByUsers,userId)) return
        await this.chatRepository.update(chat,{
            mutedBy:JSON.stringify([...mutedByUsers,userId])
        })      
    }
    public async unmute(userId: string, chatId: string): Promise<void> {
        const chat = await this.chatRepository.findOneByOrFail({id:chatId})
        const mutedByUsers = chat.mutedBy ? JSON.parse(chat.mutedBy) : []
        if(!_.includes(mutedByUsers,userId)) return

        const mutedBy = _.filter(mutedByUsers,user=>user != userId)
        await this.chatRepository.update(chat,{
            mutedBy:JSON.stringify(mutedBy)
        })      
    }
}