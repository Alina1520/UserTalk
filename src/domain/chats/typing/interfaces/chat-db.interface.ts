import { Repository } from "typeorm";
import { IAudio, IChat, IChatMember, IChatMessage, IChatMessageDeleted, IChatMessageRead, ILink } from "./chat.interface";

export type IChatRepository = Repository<IChat>
export type IChatMembersRepository = Repository<IChatMember>
export type IChatMessagesRepository = Repository<IChatMessage>
export type IChatMessagesReadRepository = Repository<IChatMessageRead>
export type IAudioRepository = Repository<IAudio>
export type ILinksRepository = Repository<ILink>
export type IChatsMessagesDeletedRepository = Repository<IChatMessageDeleted>