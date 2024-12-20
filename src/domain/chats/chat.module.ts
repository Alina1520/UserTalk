import { DynamicModule, Module } from "@nestjs/common";
import { provideEntity } from "src/libs";
import { AUDIO_REPOSITORY, CHATS_MEMBERS_REPOSITORY, CHATS_MEMBERS_SERVICE, CHATS_MESSAGES_DELETED, CHATS_MESSAGES_READ_REPOSITORY, CHATS_MESSAGES_REPOSITORY, CHATS_MESSAGES_SERVICE, CHATS_REPOSITORY, CHATS_SERVICE, LINK_REPOSITORY } from "./typing/consts";
import { Audio, Chat, ChatMember, ChatMessage, ChatMessageDeleted, ChatMessageRead, Link } from "./entities";
import { ChatMembersService, ChatMessagesService, ChatService } from "./services";
import { provideClass } from "src/shared";

@Module({})
export class ChatsModule{
    static forRoot(): DynamicModule {
		return {
			module: ChatsModule,
			providers: [
				provideEntity(CHATS_REPOSITORY, Chat),
				provideEntity(CHATS_MEMBERS_REPOSITORY, ChatMember),
				provideClass(CHATS_MEMBERS_SERVICE, ChatMembersService),
				provideEntity(CHATS_MESSAGES_REPOSITORY, ChatMessage),
				provideEntity(CHATS_MESSAGES_READ_REPOSITORY, ChatMessageRead),
				provideEntity(CHATS_MESSAGES_DELETED, ChatMessageDeleted),
				provideEntity(AUDIO_REPOSITORY, Audio),
				provideEntity(LINK_REPOSITORY, Link),
			],
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: ChatsModule,
			providers: [
				provideEntity(CHATS_REPOSITORY, Chat),
				provideEntity(CHATS_MEMBERS_REPOSITORY, ChatMember),
				provideEntity(CHATS_MESSAGES_REPOSITORY, ChatMessage),
				provideEntity(AUDIO_REPOSITORY, Audio),
				provideEntity(LINK_REPOSITORY, Link),
				provideClass(CHATS_SERVICE, ChatService),
				provideClass(CHATS_MEMBERS_SERVICE, ChatMembersService),
				provideClass(CHATS_MESSAGES_SERVICE, ChatMessagesService),
				provideEntity(CHATS_MESSAGES_DELETED, ChatMessageDeleted),
			],
			exports: [
				CHATS_REPOSITORY,
				CHATS_MEMBERS_REPOSITORY,
				CHATS_MESSAGES_REPOSITORY,
				CHATS_SERVICE,
				CHATS_MEMBERS_SERVICE,
				CHATS_MESSAGES_SERVICE,
				AUDIO_REPOSITORY,
				LINK_REPOSITORY,
			],
		}
	}
}