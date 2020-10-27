import { APIService } from "@/api/api.service";
import { IIteration } from "@/iterations/types/iteration";
import { ActionTree } from "vuex";
import { RootState } from "..";
import {
  mutationSetSession,
  mutationSetIterations,
  mutationSetLoaded,
  mutationSetLoading
} from "./overview.mutations";
import { IOverviewState } from "./overview.store";
import { ISession } from '@/planning/types/session';

export const actionLoadIterations = "loadIterations";
export const actionCreateSession = "createSession";

export const actions: ActionTree<IOverviewState, RootState> = {
  async [actionLoadIterations]({ commit }) {
    commit(mutationSetLoading, true);
    try {
      const iterations: IIteration[] = await APIService.loadIterations();
      commit(mutationSetIterations, iterations);
      commit(mutationSetLoaded, true);
    } catch (error) {
      commit(mutationSetLoaded, false);
      console.error("Could not load iterations", error);
    }
    commit(mutationSetLoading, false);
  },
  async [actionCreateSession]({ commit }, id: string) {
    try {
      const session: ISession = await APIService.createSession(id);
      commit(mutationSetSession, session);
    } catch (error) {
      console.error("Could not set iteration", error);
    }
  }
};
