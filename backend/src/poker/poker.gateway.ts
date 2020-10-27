import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { RedisService } from '../redis/redis.service'
import { IConnection } from './types/connection.type'
import { IEstimation } from 'src/stories/types/estimation.type'
import { ISession } from 'src/session/types/session.type'

@WebSocketGateway(3001)
export class PokerGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly redis: RedisService) {}

  @WebSocketServer() server
  users: number = 0

  async handleConnection() {
    // A client has connected
    this.users++

    // Notify connected clients of current users
    this.server.emit('users', this.users)
  }

  async handleDisconnect(socket: Socket) {
    // A client has disconnected
    this.users--
    await this.redis.disconnectUser(socket.id)

    // Notify connected clients of current users
    this.server.emit('users', this.users)
  }

  @SubscribeMessage('join')
  async connect(socket: Socket, data: string): Promise<void> {
    const connection: IConnection = JSON.parse(data)

    const session = await this.redis.connectUser(connection.sessionId, {
      userName: connection.userName,
      socket: socket.id,
    })
    // socket.join(connection.sessionId.toString()) Nice to have later

    if (session) {
      this.server.emit('UserConnected', { session })
    } else {
      socket.emit('UserConnected', {
        user: null,
        error: 'User already connected',
      })
    }
  }

  @SubscribeMessage('vote')
  async vote(socket: Socket, data: string): Promise<void> {
    const estimation: IEstimation = JSON.parse(data)

    // store estimation in redis
    const session: ISession = await this.redis.setVote(
      estimation.sessionId,
      estimation.userName,
      estimation.estimation,
      estimation.storyId,
      this.server
    )

    // emit to a namespace that person x has estimated
    this.server
      .to(estimation.sessionId.toString())
      .emit('UserEstimation', session)
  }
}
