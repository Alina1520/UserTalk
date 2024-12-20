import { DynamicModule, Global, Module } from "@nestjs/common";
import { CACHE_MODULE_OPTIONS, ICacheModuleOptions } from "./typing";
import { provideValue } from "src/shared";
import { CacheService } from "./cache.service";

@Module({})
export class CacheModule{
    static options:ICacheModuleOptions

    static forRoot(options:ICacheModuleOptions):DynamicModule{
        CacheModule.options = options
        return {
            module:CacheModule,
        }
    }
    static forFeature():DynamicModule{
        return {
            module:CacheModule,
            providers:[
                provideValue(CACHE_MODULE_OPTIONS,CacheModule.options),
                CacheService
            ],
            exports:[CacheService]
        }

    }

}