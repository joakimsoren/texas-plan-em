import { Controller, Get } from '@nestjs/common'
import { ClubhouseService } from '../clubhouse/clubhouse.service'
import { IStory } from '../iterations/types/story.type'
import { IWorkflowState } from 'src/iterations/types/workflow-state.type'

@Controller('backend')
export class BackendController {
  constructor(private readonly clubhouse: ClubhouseService) {}

  @Get('stories')
  async getStories(): Promise<IStory[]> {
    const states: IWorkflowState[] = await this.clubhouse.getWorkflowStates()
    return this.clubhouse.getBackendStories(states)
  }
}
