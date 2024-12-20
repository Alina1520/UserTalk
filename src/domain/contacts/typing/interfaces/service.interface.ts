import { IContact } from "./contact.interface";

export interface IContactService{
    add(payload:CreateContactPayload,userId:string):Promise<void>
    update(payload:UpdateContactPayload,id:string):Promise<IContact>
    delete(id:string):Promise<void>
}

export interface CreateContactPayload{
    firstName:string;
    lastName?:string;
    phoneNumber:string;
}

export interface UpdateContactPayload{
    firstName:string;
    lastName?:string;
}
