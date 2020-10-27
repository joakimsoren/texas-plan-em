import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ClubhouseService } from './clubhouse/clubhouse.service'
import { IterationsModule } from './iterations/iterations.module'
import { StoriesModule } from './stories/stories.module'
import { BackendModule } from './backend/backend.module'
import { RedisModule } from './redis/redis.module'
import { SessionModule } from './session/session.module'
import { PokerModule } from './poker/poker.module'

@Module({
  imports: [
    IterationsModule,
    BackendModule,
    StoriesModule,
    RedisModule,
    SessionModule,
    PokerModule,
  ],
  controllers: [AppController],
  providers: [AppService, ClubhouseService],
})
export class AppModule {}
