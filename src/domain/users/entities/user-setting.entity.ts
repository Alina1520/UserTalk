import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { IUserSetting } from "../typing";
import { User } from "./user.entity";

@Entity()
export class UserSetting implements IUserSetting{
@PrimaryColumn()
userId:string

@ManyToOne(()=>User,{onDelete:"CASCADE"})
user?:User

@PrimaryColumn()
key:string

@Column({nullable:true})
value:string;

}