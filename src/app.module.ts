import { Module } from '@nestjs/common';
import { CacheModule, DatabaseModule, JwtModule } from './libs';
import { $config } from './config';
import { SessionModule, UserModule } from './domain';
import { RestUserModule } from './rest';
import { ChatsModule } from './domain/chats';
import { RestChatModule } from './rest/chats';
import { GroupModule } from './domain/group';

@Module({
  imports: [
    DatabaseModule.forRoot(...$config.getDatabaseConfig()),
    JwtModule.forRoot($config.getJwtConfig()),
    CacheModule.forRoot($config.getRedisConfig()),
    SessionModule.forRoot(),
    UserModule.forRoot(),
    GroupModule.forRoot(),
    ChatsModule.forRoot(),
    RestUserModule.forRoot(),
    RestChatModule.forRoot()
  ]
})
export class AppModule {}
