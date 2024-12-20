import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IUpdateUserPayload, IUser, IUserCreatePayload, IUserRepository, IUserService, USER_REPOSITORY, UserRole } from "../typing";
import { UserPasswordService } from "./user-password.service";
import * as _ from "lodash"

@Injectable()
export class UserService{
    @Inject(USER_REPOSITORY) private readonly userRepository:IUserRepository
    constructor(
        private readonly userPasswordService:UserPasswordService
        ){}
        public async create(payload:IUserCreatePayload){
             const exist = await this.userRepository.findOne({
                where:[{phoneNumber:payload.phoneNumber},{login:payload.login}]
             })
             if(exist) throw new BadRequestException("User has already exist")
        
             const passwordSalt = this.userPasswordService.createUserSalt()
             const password = await this.userPasswordService.hashPassword(payload.password)

             const ent = this.userRepository.create({
                ...payload,
                password,
                passwordSalt
             })

             const user = await this.userRepository.save(ent)
             return user             
        }
        public async update(payload: IUpdateUserPayload,userId:string) {
            let user = await this.userRepository.findOne({where:{id:userId}})
            if(!user) throw new NotFoundException()
            user = this.userRepository.merge(user,_.omitBy(payload,_.isNil))
            await this.userRepository.save(user)
            return user
        }
        public async compareUserPassword(password: string,userId:string){
            const exist = await this.userPasswordService.findOneWithPassword(userId) 
            console.log(exist)
            if(!exist) throw new NotFoundException()
            return await this.userPasswordService.comparePasswords(userId,password)
        }        
        public async delete(userId:string){
            const user = await this.userRepository.findOne({where:{id:userId}})
            if(!user) throw new NotFoundException()
            await this.userRepository.delete(userId)
        }
}