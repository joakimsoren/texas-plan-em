import { Controller, Param, Put, Body } from '@nestjs/common'
import { ClubhouseService } from '../clubhouse/clubhouse.service'
import { IStory } from 'src/iterations/types/story.type'
import { IEstimation } from './types/estimation.type'
import { RedisService } from '../redis/redis.service'

@Controller('stories')
export class StoriesController {
  constructor(
    private readonly clubhouse: ClubhouseService,
    private readonly redis: RedisService
  ) {}

  @Put(':id')
  public async estimateStory(
    @Param('id') storyId: number,
    @Body() estimation: IEstimation
  ): Promise<IStory> {
    const story = await this.clubhouse.udpateEstimate(
      storyId,
      estimation.estimation
    )
    await this.redis.resetVotes(estimation.sessionId)
    return story
  }
}
