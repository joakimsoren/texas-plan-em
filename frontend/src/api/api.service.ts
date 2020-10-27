import { IIteration } from '@/iterations/types/iteration'
import axios, { AxiosResponse } from 'axios'
import { IStory } from '@/iterations/types/story'
import { ISession } from '@/planning/types/session'

const connectionString = 'http://localhost:3000'

export class APIService {
  static async loadIterations(): Promise<IIteration[]> {
    const { data } = await this.get('iterations')
    return data
  }

  static async createSession(id: string): Promise<ISession> {
    const { data } = await this.post(`session/register/${id}`, '')
    return data
  }

  static async loadStories(id: string): Promise<IStory[]> {
    const { data } = await this.get(`iterations/${id}/stories`)
    return data
  }

  static async estimateStory(
    id: number,
    estimation: number,
    sessionId: number
  ): Promise<IStory> {
    const { data } = await this.put(`stories/${id}`, { estimation, sessionId })
    return data
  }

  static async get(path: string): Promise<AxiosResponse> {
    return axios.get(`${connectionString}/${path}`)
  }

  static async post(path: string, data: any): Promise<AxiosResponse> {
    return axios.post(`${connectionString}/${path}`, data)
  }

  static async put(path: string, data: any): Promise<AxiosResponse> {
    return axios.put(`${connectionString}/${path}`, data)
  }
}
