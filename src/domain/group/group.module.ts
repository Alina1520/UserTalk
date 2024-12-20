import { DynamicModule, Global, Module } from "@nestjs/common";
import { provideClass } from "src/shared";
import { GROUPS_SERVICE, GROUP_REPOSITORY } from "./typing";
import { GroupService } from "./services";
import { provideEntity } from "src/libs";
import { Group } from "./entities";

@Module({})
export class GroupModule{
    static forFeature():DynamicModule{
        return{
            module:GroupModule,
            providers:[
                provideClass(GROUPS_SERVICE,GroupService),
                provideEntity(GROUP_REPOSITORY,Group),
            ],
            exports:[GROUPS_SERVICE,GROUP_REPOSITORY]
        }
    }
    static forRoot():DynamicModule{
        return{
            module:GroupModule
        }
    }
}