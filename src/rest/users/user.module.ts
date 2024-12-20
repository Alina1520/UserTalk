import { DynamicModule, Global, Module } from "@nestjs/common";
import { RestUserService } from "./user.service";
import { RestUserController } from "./user.controller";
import { SessionModule, UserModule } from "src/domain";

@Global()
@Module({})
export class RestUserModule{
    static forRoot():DynamicModule{
        return {
            module:RestUserModule,
            providers:[RestUserService],
            controllers:[RestUserController],
            imports:[
                UserModule.forFeature(),
                SessionModule.forFeature()                
            ]
        }
    }
}