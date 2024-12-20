import { DynamicModule, Module } from "@nestjs/common";
import { provideClass } from "src/shared";
import { CONTACT_REPOSITORY, CONTACT_SERVICE } from "./typing";
import { ContactService } from "./contact.service";
import { provideEntity } from "src/libs";
import { Contact } from "./entities";
import { UserModule } from "../users";

@Module({})
export class ContactModule{
    static forFeature():DynamicModule{
        return {
            module:ContactModule,
            providers:[
                provideClass(CONTACT_SERVICE,ContactService),
                provideEntity(CONTACT_REPOSITORY,Contact)
            ],
            imports:[UserModule],
            exports:[CONTACT_SERVICE,CONTACT_REPOSITORY]
        }
    }
    static forRoot():DynamicModule{
        return {
            module:ContactModule
        }
    }

}