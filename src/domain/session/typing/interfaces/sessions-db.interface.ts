import { Repository } from "typeorm";
import { Session } from "../../entities/session.entity";

export type ISessionRepository = Repository<Session> 