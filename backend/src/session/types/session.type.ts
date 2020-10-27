import { IVote } from './vote.type'
import { IUser } from './user.type'
export interface ISession {
  id: number
  iteration: number
  users: IUser[]
  votes: IVote[]
}
