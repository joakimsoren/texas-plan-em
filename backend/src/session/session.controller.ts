import {
  Controller,
  Post,
  Param,
  Get,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { RedisService } from 'src/redis/redis.service'
import { ISession } from './types/session.type'

@Controller('session')
export class SessionController {
  constructor(private readonly redis: RedisService) {}

  @Post('register/:iteration')
  async registerSession(
    @Param('iteration') iteration: number
  ): Promise<ISession> {
    const id: number = Math.floor(Math.random() * 10000)
    const session: ISession = {
      id,
      iteration,
      users: [],
      votes: [],
    }
    await this.redis.setSession(session)
    return session
  }

  @Post('remove/:id')
  async removeSession(@Param('id') id: number) {
    await this.redis.removeSession(id)
  }

  @Get(':id')
  async getSession(@Param('sessionId') sessionId: number): Promise<ISession> {
    return this.redis.getSession(sessionId)
  }

  @Post('connect')
  async connectUser(@Body() { userName, sessionId }): Promise<ISession> {
    const session = await this.redis.connectUser(sessionId, userName)

    if (!session) {
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN)
    }
    return session as ISession
  }
  @Post('disconnect')
  async disconnectUser(@Body() {sessionId }): Promise<void> {
    await this.redis.disconnectUser(sessionId)
  }
}
