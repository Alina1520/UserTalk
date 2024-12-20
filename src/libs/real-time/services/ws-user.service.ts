import { Logger } from "@nestjs/common";
import { WSServerService } from "./ws-server.service";
import { Socket } from "socket.io";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Events } from "src/shared";
import { getUserRoomName } from "../helpers";

export class WsUserService{
    private readonly logger = new Logger(WsUserService.name)
    constructor(
        private readonly eventEmitter:EventEmitter2
    ){}

    public joinUser(client:Socket,data:{user:any}){
        try{
            const {user} = data
			if (!user || !user.id) {
				this.logger.warn('Error connect user')
				return
			}
            this.eventEmitter.emit(Events.OnUserConnect,{
                userId:user.id
            })

            client.join(getUserRoomName(user.id))
            client.addListener("disconnect",()=>this.disconnect(user))
        }catch(e){
            this.logger.warn("Error user`s join")
        }
    }
    private disconnect(data:{user:any}){
        try{
            const {user} = data
			if (!user || !user.id) {
				this.logger.warn('Error connect user')
				return
			}
            this.eventEmitter.emit(Events.OnUserDisconnect,{
                userId:user.id
            })
        }catch(e){
            this.logger.warn("Error user`s disconnect")
        }
    }
}