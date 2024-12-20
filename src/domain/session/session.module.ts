import { DynamicModule, Global, Module } from "@nestjs/common"
import { SESSION_SERVICE, SESSION_REPOSITORY } from "./typing";
import { AuthGuard} from "./guards";
import { SessionService } from "./session.service";
import { CacheModule, JwtModule, provideEntity } from "src/libs";
import { provideClass } from "src/shared";
import { Session } from "./entities/session.entity";

@Global()
@Module({})
export class SessionModule{
    static getProviders(){
        return [
            provideEntity(SESSION_REPOSITORY,Session),
            provideClass(SESSION_SERVICE,SessionService),
            AuthGuard,
            ]
    }
    static getImports(){
        return [JwtModule.forFeature(),CacheModule.forFeature()]
    }
    static getExports(){
        return [SESSION_SERVICE]
    }
    static forRoot():DynamicModule{
        return {
        module:SessionModule,
        imports:SessionModule.getImports(),
        providers:SessionModule.getProviders(),
        exports:SessionModule.getExports()
        }
    }
    static forFeature():DynamicModule{
        return {
        module:SessionModule,
        imports:SessionModule.getImports(),
        providers:SessionModule.getProviders(),
        exports:SessionModule.getExports()
        }
    }
}