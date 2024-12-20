import { Injectable } from "@nestjs/common";
import { WSServerService } from "./ws-server.service";
import { getUserRoomName } from "../helpers";

@Injectable()
export class WsService{
    constructor(private wsServerService:WSServerService){}

	public emitToUser(userId: string, key: string, data?: any) {
		this.wsServerService.emitToRoom(getUserRoomName(userId), key, data)
	}
    public emitToRoom(room:string, key: string, data?: any) {
		this.wsServerService.emitToRoom(room, key, data)
	}
    public getUsersIdsOnline(){
        return this.wsServerService.getUsersOnlineIds()
    }
}