import { Module } from '@nestjs/common'
import { StoriesController } from './stories.controller'
import { ClubhouseService } from '../clubhouse/clubhouse.service'
import { RedisService } from '../redis/redis.service'

@Module({
  controllers: [StoriesController],
  providers: [ClubhouseService, RedisService],
})
export class StoriesModule {}
