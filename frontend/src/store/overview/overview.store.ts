import { actions } from '@/store/overview/overview.actions'
import { mutations } from '@/store/overview/overview.mutations'
import { ISession } from '@/planning/types/session'
import { IIteration } from '@/iterations/types/iteration'

export const namespace = 'overview'

export interface IOverviewState {
  loading: boolean
  loaded: boolean
  iterations: IIteration[]
  selectedIterationId: number
  link: string
  name: string
  session?: ISession
}

export const state: IOverviewState = {
  loading: false,
  loaded: false,
  iterations: [],
  selectedIterationId: null,
  session: undefined,
  link: null,
  name: null,
}

const namespaced = true

export const overview = {
  actions,
  namespaced,
  mutations,
  state,
}
