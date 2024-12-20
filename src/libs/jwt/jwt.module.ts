import { DynamicModule, Global, Module } from "@nestjs/common";
import { JWT_KEY, JWT_PAYLOAD_KEY, JwtModuleOptions } from "./typing";
import { provideValue } from "src/shared";
import { JwtService } from "./jwt.service";

@Global()
@Module({})
export class JwtModule{
    static options:JwtModuleOptions
    static forRoot(options:JwtModuleOptions):DynamicModule{
        JwtModule.options = options
        return {
           module: JwtModule
       }
    }
    
    static forFeature():DynamicModule{
        return {
           module: JwtModule,
           providers:[
            JwtService,
            provideValue(JWT_KEY,JwtModule.options.jwtKey),
            provideValue(JWT_PAYLOAD_KEY,JwtModule.options.jwtPayloadKey)
           ],
           exports:[JwtService]
       }
    }
}