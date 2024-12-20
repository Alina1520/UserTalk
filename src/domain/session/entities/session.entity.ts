import { BaseEntity } from "src/shared";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { ISession } from "../typing";

@Entity()
export class Session extends BaseEntity implements ISession{
    @Column()
    userId:string;
    
    @Column()
    deviceName:string;

    @Column()
    accessToken:string;

    @Column()
    refreshToken:string;

    @CreateDateColumn({type:"timestamp",default:()=>'LOCALTIMESTAMP'}) 
    createdAt:Date;
    
    @UpdateDateColumn({type:"timestamp",default:()=>'LOCALTIMESTAMP'}) 
    updatedAt:Date;
}