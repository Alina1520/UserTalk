import { Inject, NotFoundException } from "@nestjs/common";
import { CONTACT_REPOSITORY, CONTACT_SERVICE, CreateContactPayload, IContact, IContactRepository, IContactService, UpdateContactPayload } from "./typing";
import { IUserRepository } from "../users";
import * as _ from "lodash"

export class ContactService implements IContactService{
    @Inject(CONTACT_REPOSITORY) private readonly contactRepository:IContactRepository
    @Inject(CONTACT_SERVICE) private readonly contactService:IContactService
    constructor(
        private readonly userRepository:IUserRepository
    ){}
    public async add(payload: CreateContactPayload, userId: string): Promise<void> {
        const contact = await this.contactRepository.findOneBy({userId,phoneNumber:payload.phoneNumber})
        if(contact) return 
        const data = await this.prepareContact(userId,payload)
        const entity = await this.contactRepository.create(data)
        await this.contactRepository.save(entity)
    }
    private async prepareContact(userId:string,payload: CreateContactPayload){
        const data :Record<string,string> = {
            ...payload,
            userId
        }
        
		const existingUser = await this.findUserByPhone(payload.phoneNumber)

		if (existingUser) {
			data.targetUserId = existingUser.id

			if (existingUser.avatarUrl !== null) {
				data.avatarUrl = String(existingUser.avatarUrl)
			}
		}
        return data
    }
    private async findUserByPhone(phoneNumber:string){
        const user = await this.userRepository.findOneBy({phoneNumber:phoneNumber})
        return user
    }
    public async update(payload: UpdateContactPayload, id: string): Promise<IContact> {
        let contact = await this.contactRepository.findOne({where:{id}})
        if(!contact) throw new NotFoundException("Contact is not found ")
        contact = await this.contactRepository.merge(contact,_.omitBy(_.omit(payload),_.isNil))
    await this.contactRepository.save(contact)
    return contact        
}
public async delete(id:string):Promise<void>{
    const contact = await this.contactRepository.findOne({where:{id}})
    if(!contact) return
    await this.contactRepository.remove(contact)
    }
}