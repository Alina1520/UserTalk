
import { ChatMember } from "./chat-member.entity";
import { ChatMessageRead } from "./chat-message-read.entity";
import { ChatMessage } from "./chat-message.entity";
import { Chat } from "./chat.entity";
import { ChatMessageDeleted } from "./chat-message-deleted.entity";
import { Link } from "./link.entity";
import { Audio } from "./audio.entity";

export const CHAT_ENTITIES = [Chat,
    ChatMember,
    ChatMessage,
	ChatMessageRead,
	Audio,
    Link,
	ChatMessageDeleted
]
export {
    Chat,
    ChatMember,
    ChatMessage,
	ChatMessageRead,
	Audio,
    Link,
	ChatMessageDeleted
}