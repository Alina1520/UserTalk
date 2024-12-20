import { BaseEntity } from "src/shared";
import { Column, Entity } from "typeorm";

@Entity("contacts")
export class Contact extends BaseEntity{
    @Column({nullable:false})
    userId:string;

    @Column({nullable:true})
    targetId?:string;

    @Column({nullable:false,default:false})
    isAccess:boolean;

    @Column({nullable:false})
    firstName:string;

    @Column({nullable:true})
    lastName?:string;

    @Column({nullable:false})
    phoneNumber:string;

    @Column({nullable:false,default:false})
    mute:boolean
}