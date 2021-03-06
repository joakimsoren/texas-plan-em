import { APIService } from '@/api/api.service'
import { IStory } from '@/iterations/types/story'
import { IPlayer } from '@/planning/types/player'
import { ActionTree } from 'vuex'
import { RootState } from '..'
import {
  mutationSetDone,
  mutationSetLoading,
} from '../planning/planning.mutations'
import {
  mutationSetPlayers,
  mutationSetActiveStory,
  mutationSetCode,
  mutationSetPlayer,
  mutationSetStories,
  mutationSetStoryAsEstimated,
} from './planning.mutations'
import { IPlanningState } from './planning.store'
import io from 'socket.io-client'

export const actionLoadStories = 'loadStories'
export const actionSetPlayerFromName = 'setPlayerFromName'
export const actionSetEstimate = 'setEstimate'
export const actionSetPlayers = 'setPlayers'
export const actionSetStoryAsEstimated = 'setStoryAsEstimated'
export const actionDone = 'done'

export const actions: ActionTree<IPlanningState, RootState> = {
  async [actionLoadStories]({ commit }, id: string) {
    commit(mutationSetCode, id)
    commit(mutationSetLoading, true)
    try {
      const stories: IStory[] = await APIService.loadStories(id)
      commit(mutationSetStories, stories)
      commit(mutationSetActiveStory, stories[0])
    } catch (error) {
      console.error('Could not load stories', error)
    }
    commit(mutationSetLoading, false)
  },
  [actionSetPlayerFromName]({ commit }, name: string) {
    const player: IPlayer = { name: name, estimate: 0 }
    commit(mutationSetPlayer, player)
  },
  async [actionSetEstimate](
    { state },
    {
      estimate,
      sessionId,
      userName,
    }: { estimate: number; sessionId: number; userName: string }
  ) {
    try {
      const socket = io('http://localhost:3001')
      socket.emit(
        'vote',
        JSON.stringify({
          sessionId: sessionId,
          userName: userName,
          estimation: estimate,
          storyId: state.activeStory.id,
        })
      )
    } catch (error) {
      console.error('Could not estimate story', error)
    }
  },
  [actionSetStoryAsEstimated]({ commit, state }) {
    commit(mutationSetStoryAsEstimated, state.activeStory)
    if (state.stories.length === 0) {
      commit(mutationSetDone, true)
    }
    commit(mutationSetActiveStory, state.stories[0])
  },
  async [actionSetPlayers]({ commit }, players: IPlayer[]) {
    commit(mutationSetPlayers, players)
  },
  [actionDone]({ commit }, done: boolean) {
    commit(mutationSetDone, false)
  },
}
