import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository, USER_REPOSITORY } from "../typing";
import * as bcrypt from "bcryptjs"
import * as randomstring from 'randomstring'

@Injectable()
export class UserPasswordService{
    private readonly saltRounds = 10
constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository:IUserRepository){}

public async comparePasswords(userId:string,password:string){
    const user = await this.findOneWithPassword(userId)
    if(!user.password) return false
    return await bcrypt.compare(password,user.password)
}
public async findOneWithPassword(userId:string){
const user = await this.userRepository.findOne({
    where:{id:userId},
    select:["id","password","passwordSalt"]
})
if(!user) throw new NotFoundException()
return user
}
public async changeUserPassword(userId: string, newPassword: string) {
    const user = await this.findOneWithPassword(userId)
    if (!user.passwordSalt) user.passwordSalt = this.createUserSalt()
    user.password = await this.hashPassword(newPassword)
    await this.userRepository.save(user)
}
public async hashPassword(password:string){
    return await bcrypt.hash(password,this.saltRounds)
}

public createUserSalt():string{
    return randomstring.generate(10)
}
}