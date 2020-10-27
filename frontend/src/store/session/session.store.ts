import { actions } from './session.actions'
import { mutations } from './session.mutations'
export const namespace = 'planning'

export const state = {
  sprints: [],
  link: null,
}

const namespaced = true

export const planning = {
  actions,
  namespaced,
  mutations,
  state,
}
