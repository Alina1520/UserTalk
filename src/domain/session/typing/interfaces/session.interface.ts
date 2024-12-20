export class ISession{
    id:string;
    userId:string;
    deviceName:string;
    accessToken:string;
    refreshToken:string;
    createdAt?:Date;
    updatedAt?:Date;
}