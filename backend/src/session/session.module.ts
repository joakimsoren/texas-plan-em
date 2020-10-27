import { Module } from '@nestjs/common'
import { SessionController } from './session.controller'
import { RedisService } from '../redis/redis.service'

@Module({
  controllers: [SessionController],
  providers: [RedisService],
})
export class SessionModule {}
