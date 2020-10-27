import { APIService } from '@/api/api.service'
import { IStory } from '@/iterations/types/story'
import { IPlayer } from '@/planning/types/player'
import { ActionTree } from 'vuex'
import { RootState } from '..'
import {} from '../planning/planning.mutations'
import {
  mutationSetPlayers,
  mutationSetActiveStory,
  mutationSetCode,
  mutationSetPlayer,
  mutationSetStories,
  mutationSetStoryAsEstimated,
} from './planning.mutations'
import { IPlanningState } from './planning.store'

export const actionLoadStories = 'loadStories'
export const actionSetPlayerFromName = 'setPlayerFromName'
export const actionSetEstimate = 'setEstimate'
export const actionSetPlayers = 'setPlayers'

export const actions: ActionTree<IPlanningState, RootState> = {
  async [actionLoadStories]({ commit }, id: string) {
    commit(mutationSetCode, id)
    try {
      const stories: IStory[] = await APIService.loadStories(id)
      commit(mutationSetStories, stories)
      commit(mutationSetActiveStory, stories[0])
    } catch (error) {
      console.error('Could not load stories', error)
    }
  },
  [actionSetPlayerFromName]({ commit }, name: string) {
    const player: IPlayer = { name: name, estimate: 0 }
    commit(mutationSetPlayer, player)
  },
  async [actionSetEstimate](
    { commit, state },
    { estimate, sessionId }: { estimate: number; sessionId: number }
  ) {
    try {
      const estimatedStory: IStory = await APIService.estimateStory(
        state.activeStory.id,
        estimate,
        sessionId
      )
      commit(mutationSetStoryAsEstimated, estimatedStory)
      commit(mutationSetActiveStory, state.stories[0])
    } catch (error) {
      console.error('Could not estimate story', error)
    }
  },
  async [actionSetPlayers]({ commit }, players: IPlayer[]) {
    commit(mutationSetPlayers, players)
  },
}