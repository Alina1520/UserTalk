import { BlockedUser } from "./blocked-user.entity";
import { UserLocation } from "./user-location.entity";
import { UserSetting } from "./user-setting.entity";
import { User } from "./user.entity";

export const USERS_ENTITIES = [User, UserSetting, BlockedUser, UserLocation]
export {
    User, UserSetting, BlockedUser, UserLocation
}
