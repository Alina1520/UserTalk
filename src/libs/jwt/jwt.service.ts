import { Inject, Injectable } from "@nestjs/common";
import { ICreateTokenPayload, JWT_KEY, JWT_PAYLOAD_KEY } from "./typing";
import * as jwt from "jsonwebtoken"
const aes256 = require("aes256")

@Injectable()
export class JwtService{
    constructor(
        @Inject(JWT_KEY)
        private jwtKey:string,
        @Inject(JWT_PAYLOAD_KEY)
        private jwtPayloadKey:string
        ){}
        public createToken({id,expiresIn='1000s',sessionId}:ICreateTokenPayload){
            const payload = {
                sub:aes256.encrypt(
                    this.jwtPayloadKey,
                    JSON.stringify({
                        id,sessionId
                    })
                )
            }
            return jwt.sign(payload,this.jwtKey,expiresIn ? { expiresIn } : {}) 
        }

        public decodeToken(token:string){
            try {
                const result = jwt.verify(token,this.jwtKey)
                if(!result) return null
                const decoded = JSON.parse(aes256.decrypt(this.jwtPayloadKey,result.sub))
                return {
                    id:decoded.id,
                    sessionId:decoded.sessionId
                }
            } catch (error) {
                return error
            }
        }
}