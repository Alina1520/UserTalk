import { Logger, OnModuleInit } from "@nestjs/common";
import { getEnv, stringToBoolean } from "../helpers";

export abstract class Seeder implements OnModuleInit{
    protected abstract name:string;
    protected isEnabled:boolean
    
	protected abstract seed(): void | Promise<void>
    private logger:Logger
    constructor(){
        this.isEnabled = stringToBoolean(getEnv('AUTO_SEED_ENABLED'))
    }

    private async run(){
        try{
            await this.seed()
        }catch(e){
            this.logger.warn(e)
        }
    }

    public onModuleInit() {
        this.logger = new Logger(this.name)
        if(this.isEnabled){
            this.run()
        }
    }
}