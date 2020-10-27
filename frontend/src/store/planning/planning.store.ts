import { actions } from "./planning.actions";
import { mutations } from "./planning.mutations";
import { IStory } from "@/iterations/types/story";
import { IIteration } from "@/iterations/types/iteration";
import { IPlayer } from "@/planning/types/player";

export const namespace = "planning";

export interface IPlanningState {
  activeStory: IStory;
  stories: IStory[];
  player: IPlayer;
  players: IPlayer[];
  estimatedStories: IStory[];
  iteration: IIteration;
  estimate: number;
  code: string;
}

export const state = {
  activeStory: null,
  stories: [],
  estimatedStories: [],
  player: null,
  players: [],
  iteration: null,
  estimate: null,
  code: null
};

const namespaced = true;

export const planning = {
  actions,
  namespaced,
  mutations,
  state
};
