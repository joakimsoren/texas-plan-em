import { Module } from '@nestjs/common'
import { PokerGateway } from './poker.gateway'
import { RedisService } from '../redis/redis.service'

@Module({
  providers: [PokerGateway, RedisService],
})
export class PokerModule {}
