import axios, { AxiosResponse } from 'axios'
import { Injectable } from '@nestjs/common'
import * as moment from 'moment'
import { IIteration } from '../iterations/types/iteration.type'
import { IStory } from '../iterations/types/story.type'
import { IWorkflowState } from '../iterations/types/workflow-state.type'

@Injectable()
export class ClubhouseService {
  private readonly baseUrl: string
  private readonly token: string
  constructor() {
    this.baseUrl = 'https://api.clubhouse.io/api/v3'
    this.token = process.env.CLUBHOUSE_TOKEN
  }

  public async getIterations(): Promise<IIteration[]> {
    const { data } = await this.get('iterations')
    return data
  }

  public filterIterations(iterations: IIteration[]): IIteration[] {
    return iterations.filter((iteration: IIteration) => {
      return moment(iteration.end_date).isAfter(moment())
    })
  }

  public async getIterationStories(
    id: number,
    states: IWorkflowState[]
  ): Promise<IStory[]> {
    const { data } = await this.get(`iterations/${id}/stories`, {includes_description: true})
    return data.map((story: IStory) => ({
      ...story,
      state: states.find(
        (state: IWorkflowState) => story.workflow_state_id === state.id
      ),
    }))
  }

  public filterStories(stories: IStory[]): IStory[] {
    return stories.filter((story: IStory) => {
      return !story.estimate && story.story_type === 'feature'
    })
  }

  public async getWorkflowStates(): Promise<IWorkflowState[]> {
    const { data } = await this.get('workflows')
    const [workflow]: any = data
    return workflow.states
  }

  public async getBackendStories(states: IWorkflowState[]): Promise<IStory[]> {
    const groomingState: IWorkflowState = states.find(
      (state: IWorkflowState) => state.name === 'Ready for Grooming'
    )
    const body = {
      archived: false,
      workflow_state_id: groomingState.id,
      label_name: 'Backend',
      iteration_id: null,
    }
    const { data } = await axios.post(
      `${this.baseUrl}/stories/search?token=${this.token}`,
      body
    )
    return data
  }

  public async udpateEstimate(
    storyId: number,
    estimate: number
  ): Promise<IStory> {
    const { data } = await axios.put(
      `${this.baseUrl}/stories/${storyId}?token=${this.token}`,
      {
        estimate,
      }
    )
    return data
  }

  private async get(endpoint: string, params?): Promise<AxiosResponse> {
    return axios.get(`${this.baseUrl}/${endpoint}?token=${this.token}`, {
      params
    })
  }
}
