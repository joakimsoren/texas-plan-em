import { IIteration } from "@/iterations/types/iteration";
import { actions } from "@/store/overview/overview.actions";
import { mutations } from "@/store/overview/overview.mutations";
import { ISession } from '@/planning/types/session';

export const namespace = "overview";

export interface IOverviewState {
  loading: boolean;
  loaded: boolean;
  iterations: IIteration[];
  session?: ISession;
}

export const state: IOverviewState = {
  loading: false,
  loaded: false,
  iterations: [],
  session: undefined,
};

const namespaced = true;

export const overview = {
  actions,
  namespaced,
  mutations,
  state
};
