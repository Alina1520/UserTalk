import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { IUser } from "./user.interface";

export type IUserRepository = Repository<IUser>