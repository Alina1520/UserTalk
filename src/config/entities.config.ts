import { SESSION_ENTITIES } from "src/domain";
import { CHAT_ENTITIES } from "src/domain/chats/entities";
import { GROUPS_ENTITIES } from "src/domain/group";
import { USERS_ENTITIES } from "src/domain/users/entities";

export const ENTITIES = [
    ...USERS_ENTITIES,
    ...SESSION_ENTITIES,
    ...CHAT_ENTITIES,
    ...GROUPS_ENTITIES
]