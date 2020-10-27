import { Injectable } from '@nestjs/common'
import * as Redis from 'ioredis'
import { ISession } from '../session/types/session.type'
import { IVote } from '../session/types/vote.type'
import { IUser } from '../session/types/user.type'

@Injectable()
export class RedisService {
  private readonly redis: Redis.Redis

  constructor() {
    this.redis = new Redis({ host: 'redis' })
  }

  public async setSession(session: ISession): Promise<void> {
    await this.redis.set(session.id.toString(), JSON.stringify(session))
  }

  public async removeSession(sessionId: number): Promise<void> {
    await this.redis.del(sessionId.toString())
  }

  public async getSession(id: number): Promise<ISession> {
    const result = await this.redis.get(id.toString())
    return JSON.parse(result)
  }

  public async setVote(
    sessionId: number,
    userName: string,
    estimate: number
  ): Promise<ISession> {
    const session: ISession = await this.getSession(sessionId)
    const votes: IVote[] = session.votes.filter(
      (vote: IVote) => vote.user !== userName
    )
    const payload: ISession = {
      ...session,
      votes: [...votes, { user: userName, estimate }],
    }
    await this.setSession(payload)
    return payload
  }

  public async resetVotes(sessionId: number): Promise<ISession> {
    const session: ISession = await this.getSession(sessionId)
    const payload: ISession = {
      ...session,
      votes: [],
    }
    await this.setSession(payload)
    return payload
  }

  public async connectUser(
    sessionId: number,
    user: IUser
  ): Promise<ISession | boolean> {
    const session: ISession = await this.getSession(sessionId)
    const { users } = session
    const existingUser = users.find((u: IUser) => u.userName === user.userName)
    if (existingUser) {
      return false
    }
    const payload: ISession = {
      ...session,
      users: [...users, user],
    }
    await this.setSession(payload)
    return payload
  }

  public async disconnectUser(socketId: string): Promise<void> {
    const sessionIds: string[] = await this.redis.keys('*')
    for (const sessionId in sessionIds) {
      const session: ISession = JSON.parse(await this.redis.get(sessionId))
      const { users } = session
      const payload: ISession = {
        ...session,
        users: users.filter((user: IUser) => user.socket !== socketId),
      }
      await this.setSession(payload)
    }
  }
}
