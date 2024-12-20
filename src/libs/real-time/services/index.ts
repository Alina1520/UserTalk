
import { WSServerService } from './ws-server.service'
import { WsUserService } from './ws-user.service'
import { WsService } from './ws.service'

export const REAL_TIME_SERVICES = [WSServerService,WsService,WsUserService]

export { WSServerService, WsService, WsUserService }
