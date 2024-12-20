import { OnEvent } from "@nestjs/event-emitter";
import { Events, IEventsPayloads } from "src/shared";
import { WSServerService } from "./ws-server.service";
import { WsService } from "./ws.service";
import { WsUserService } from "./ws-user.service";
import * as _ from "lodash"

export class WsEventHandlerService{
    constructor(
        private readonly wsServiceServer:WSServerService,
        private readonly wsService:WsService,
        private readonly wsUserService:WsUserService
    ){}
    
    @OnEvent(Events.OnUserConnect)
    public async onUserConnect(dto:IEventsPayloads[Events.OnUserConnect]){
        console.log("Event user connect",dto)
        const userIds = await this.wsService.getUsersIdsOnline()
        if(_.includes(userIds,dto.userId)) return 
        userIds.map(it=>{
            if(it!==dto.userId){
                this.wsService.emitToUser(it,"user/connect",{userId:dto.userId})
            }
        })
    }

    @OnEvent(Events.OnUserDisconnect)
    public async onUserDisconnect(dto:IEventsPayloads[Events.OnUserDisconnect]){
        console.log("Event user disconnect",dto)
        const userIds = await this.wsService.getUsersIdsOnline()
        if(_.includes(userIds,dto.userId)) return 
        userIds.map(it=>{
            if(it!==dto.userId){
                this.wsService.emitToUser(it,"user/disconnect",{userId:dto.userId})
            }
        })
    }
}