import { DatabaseModule, ICacheModuleOptions } from "src/libs";
import { getEnv, stringToBoolean } from "src/shared";
import {ENTITIES} from "./entities.config"
import  {SUBSCRIBERS} from "./subscribers.config"

const getDatabaseConfig = ():Parameters<(typeof DatabaseModule)['forRoot']>=>{
return [{
type:"postgres",
port: Number(getEnv('DATABASE_PORT')),
host: getEnv('DATABASE_HOST'),
username: getEnv('DATABASE_USER'),
password: getEnv('DATABASE_PASS'),
database: getEnv('DATABASE_DB'),
synchronize: true,
ssl: stringToBoolean(getEnv('USE_SSL')),
},
ENTITIES,
SUBSCRIBERS
]
}

const getJwtConfig = () =>{
    return {jwtKey:getEnv('JWT_KEY'),jwtPayloadKey:getEnv("JWT_PAYLOAD_KEY")}
}
const getRedisConfig = () :ICacheModuleOptions =>{
    return {
        port:Number(getEnv("REDIS_PORT")),
        host:getEnv("REDIS_HOST"),
        password:getEnv("REDIS_PASS")
       }
}

export const $config = {
    getDatabaseConfig,
    getJwtConfig,
    getRedisConfig
}