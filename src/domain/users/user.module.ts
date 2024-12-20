import { DynamicModule, Global, Module } from "@nestjs/common";
import { provideEntity } from "src/libs";
import { provideClass, provideValue } from "src/shared";
import { PASSWORD_HASH_SALT, USER_REPOSITORY, USER_SERVICE, UserModuleOptions } from "./typing";
import { User } from "./entities/user.entity";
import { UserPasswordService, UserService } from "./services";
import { UserSeed } from "./seeds";

@Module({})
export class UserModule{
    static forRoot():DynamicModule{
        return {
            module:UserModule,
            providers:[
                provideEntity(USER_REPOSITORY,User),
                provideClass(USER_SERVICE,UserService),
                UserPasswordService,
                ],
                exports:[
                USER_SERVICE,
                USER_REPOSITORY
            ]
        }
        
    }
    static forFeature():DynamicModule{
        return {
            module:UserModule,
            providers:[
                provideEntity(USER_REPOSITORY,User),
                provideClass(USER_SERVICE,UserService),
                UserPasswordService,
                ],
                exports:[
                USER_SERVICE,
                USER_REPOSITORY
            ]
        }

}
}