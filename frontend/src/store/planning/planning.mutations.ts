import { IStory } from '@/iterations/types/story'
import { MutationTree } from 'vuex'
import { IPlanningState } from './planning.store'
import { IPlayer } from '@/planning/types/player'

export const mutationSetStories = 'setStories'
export const mutationSetCode = 'setCode'
export const mutationSetPlayer = 'setPlayer'
export const mutationSetActiveStory = 'setActiveStory'
export const mutationSetStoryAsEstimated = 'setStoryAsEstimated'
export const mutationSetPlayers = 'setPlayers'
export const mutationSetLoading = 'setLoading'
export const mutationSetDone = 'setDone'

export const mutations: MutationTree<IPlanningState> = {
  [mutationSetStories](state: IPlanningState, stories: IStory[]) {
    state.stories = stories
  },
  [mutationSetCode](state: IPlanningState, code: string) {
    state.code = code
  },
  [mutationSetPlayer](state: IPlanningState, player) {
    state.player = player
  },
  [mutationSetActiveStory](state: IPlanningState, story: IStory) {
    state.activeStory = story
  },
  [mutationSetStoryAsEstimated](state: IPlanningState, story: IStory) {
    state.stories = state.stories.filter(
      (stateStory: IStory) => stateStory.id !== story.id
    )
    state.estimatedStories = [...state.estimatedStories, story]
  },
  [mutationSetPlayers](state: IPlanningState, players: IPlayer[]) {
    state.players = players
  },
  [mutationSetLoading](state: IPlanningState, loading: boolean) {
    state.loading = loading
  },
  [mutationSetDone](state: IPlanningState, done: boolean) {
    state.done = done
  },
}
