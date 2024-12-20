import { DynamicModule, Module } from "@nestjs/common";
import { REAL_TIME_SERVICES, WSServerService, WsService } from "./services";
import { MainGateway } from "./gateways";

@Module({})
export class RealTimeModule{
    static forRoot():DynamicModule{
        return{
            module:RealTimeModule,
        }
    }
    static forFeature():DynamicModule{
        return{
            module:RealTimeModule,
            providers:[...REAL_TIME_SERVICES,MainGateway],
            exports:[WsService]
        }
    }
}