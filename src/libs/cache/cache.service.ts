import { Inject, Injectable } from "@nestjs/common";
import { Redis, RedisKey } from "ioredis";
import { CACHE_MODULE_OPTIONS, ICacheModuleOptions } from "./typing";

@Injectable()
export class CacheService {
    private client:Redis

    constructor(@Inject(CACHE_MODULE_OPTIONS) options:ICacheModuleOptions){
        this.client = new Redis(options)
    }

    public async set(key:RedisKey,value:string | number | Buffer,lifeTime?:number){
        if(lifeTime) await this.client.set(key,value,'EX',lifeTime)
        else await this.client.set(key,value)
    }

    public async get(key:RedisKey){
       return await this.client.get(key)
    }

    public async del(key:RedisKey){
        await this.client.del(key)
    }

}