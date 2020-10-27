import { MutationTree } from "vuex";
import { IOverviewState } from "./overview.store";
import { IIteration } from "@/iterations/types/iteration";
import { ISession } from '@/planning/types/session';

export const mutationSetLoading = "setLoading";
export const mutationSetLoaded = "setLoaded";
export const mutationSetIterations = "setIterations";
export const mutationSetSession = "setSession";

export const mutations: MutationTree<IOverviewState> = {
  [mutationSetLoading](state: IOverviewState, loading: boolean) {
    state.loading = loading;
  },
  [mutationSetLoaded](state: IOverviewState, loaded: boolean) {
    state.loaded = loaded;
  },
  [mutationSetIterations](state: IOverviewState, iterations: IIteration[]) {
    state.iterations = iterations;
  },
  [mutationSetSession](state: IOverviewState, session: ISession) {
    state.session = session;
  }
};
