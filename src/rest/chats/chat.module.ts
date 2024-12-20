import { DynamicModule, Module } from "@nestjs/common";
import { ChatsModule } from "src/domain/chats";
import { RestChatController } from "./controllers";
import { RestChatService } from "./services";
import { RealTimeModule } from "src/libs";

@Module({})
export class RestChatModule{
    static forRoot():DynamicModule{
        return {
            module:RestChatModule,
            imports:[
                ChatsModule.forFeature(),
                RealTimeModule.forFeature()
            ],
            controllers:[RestChatController],
            providers:[
                RestChatService],            
        }
    }
   
}