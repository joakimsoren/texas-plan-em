import Vue from "vue";
import Vuex from "vuex";
import { overview } from "@/store/overview/overview.store";
import { planning } from "@/store/planning/planning.store";

Vue.use(Vuex);

export interface RootState {
  version: string;
}

export const state: RootState = {
  version: "1.0.0"
};

export default new Vuex.Store({
  state,
  mutations: {},
  actions: {},
  modules: {
    overview,
    planning
  }
});
