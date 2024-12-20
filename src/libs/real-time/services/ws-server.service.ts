import { Injectable } from "@nestjs/common";
import * as _ from "lodash"
import { Server } from "socket.io";

@Injectable()
export class WSServerService {
    private _server:Server

    public set server(val){
        this._server = val
    }

    public get server(){
        return this._server
    }

    public emitToRoom(room:string | string[],key:string,data?:any){
        this.server.to(room).emit(key,data)
    }
    public getUsersOnlineIds():Promise<string[]>{
        return new Promise((resolve,reject)=>{
            try{
                const roomsMap = this.server.of('/').adapter.rooms
                console.log("roomsMap ",roomsMap)
                const rooms = Object.fromEntries(roomsMap)
                console.log("room ",rooms)
                const ids:string[] = []
                for (const room in rooms){
                    if(room.startsWith('user-') && !_.isEmpty(rooms[room])){
                        ids.push(room.substring(5))
                    }
                }
                console.log(ids)
                resolve(ids)
            }catch(e){
                reject(e)
            }
        })
    }
}