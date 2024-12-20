import { Injectable } from "@nestjs/common";
import { Seeder, getEnv } from "src/shared";
import { UserService } from "../services";
import { UserRole } from "../typing";
import * as _ from "lodash"

@Injectable()
export class UserSeed extends Seeder{
    protected name = "Default users"
    
	constructor(private readonly usersService: UserService) {
		super()
	}
    protected async seed():Promise<void> {
        console.log("USER SEED START")

        await this.usersService.create({
				email: 'admin@admin.com',
				firstName: 'Admin',
				lastName: 'Admin',
				password: getEnv('ADMIN_PASSWORD'),
				login: 'admin',
				phoneNumber: '123456',
                role:UserRole.Admin
        }).catch(_.noop)

        
        await this.usersService.create({
            email: 'user@user.com',
            firstName: 'User',
            lastName: 'User',
            password: _.defaultTo(getEnv('USER_PASSWORD', true), '123qaz'),
            login: 'user',
            phoneNumber: '380980000000',
            role: UserRole.User,
    }).catch(_.noop)

    
    await this.usersService.create({
        email: 'manager@manager.com',
        firstName: 'Manager',
        lastName: 'Manager',
        password: _.defaultTo(getEnv('MANAGER_PASSWORD', true), '123qaz'),
        phoneNumber: '380980111111',
        login: 'manager',
        role: UserRole.Manager,
}).catch(_.noop)
    }

}