import { IStats } from "./stats";

export interface IIteration {
  app_url: string;
  entity_type: string;
  labels: string[];
  mention_ids: string[];
  member_mention_ids: string[];
  name: string;
  updated_at: string;
  group_mention_ids: string[];
  end_date: Date;
  follower_ids: string[];
  group_ids: string[];
  start_date: string;
  status: string;
  id: number;
  stats: IStats;
  created_at: Date;
}
