import { Injectable, Logger, UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { WSServerService, WsService, WsUserService } from "../services";
import { Server, Socket } from "socket.io";
import { JwtWsGuard } from "../guards";
import { JwtService } from "src/libs/jwt";

@WebSocketGateway({
    transports:['websocket','polling'],
    cors:{
        origin: "*"
    }
})
export class MainGateway{
    private readonly logger = new Logger(MainGateway.name)
    constructor(
        private readonly wsServerService:WSServerService,
        private readonly wsUserService:WsUserService,
        private readonly jwtService:JwtService
    ){}
    public afterInit(server:Server){
        this.wsServerService.server = server
    }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage("join-user")
    async onUserConnect(
        @MessageBody("user") user:any,
        @ConnectedSocket() client:Socket
        ):Promise<void>{
            await this.wsUserService.joinUser(client,user)
    }

    handleConnection(@ConnectedSocket() client: Socket) {
		console.log('handshake', client.handshake.auth)
		const accessToken = client.handshake.auth.accessToken
		if (accessToken) {
			const user = this.jwtService.decodeToken(accessToken)
			console.log('user', user)
			this.wsUserService.joinUser(client, { user })
		}
		this.logger.log('Connect new user to server')
	}

	handleDisconnect() {
		this.logger.log('User disconnect from server')
	}
}