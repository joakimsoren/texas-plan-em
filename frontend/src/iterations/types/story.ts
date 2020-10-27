import { IStoryLink } from './story-link'
import { IWorkflowState } from './workflow-state'

export interface IStory {
  app_url: string
  description: string
  archived: boolean
  started: boolean
  story_links: IStoryLink[]
  entity_type: string
  labels: string[]
  external_tickets: string[]
  task_ids: string[]
  mention_ids: string[]
  member_mention_ids: string[]
  story_type: string
  file_ids: string[]
  completed_at_override: Date
  started_at: Date
  completed_at: Date
  name: string
  completed: boolean
  blocker: boolean
  epic_id: number
  previous_iteration_ids: string[]
  requested_by_id: string
  iteration_id: number
  started_at_override: Date
  workflow_state_id: number
  updated_at: Date
  group_mention_ids: string[]
  support_tickets: string[]
  follower_ids: string[]
  owner_ids: string[]
  external_id: string
  id: number
  estimate: number
  position: number
  blocked: boolean
  project_id: number
  linked_file_ids: string[]
  deadline: Date
  comment_ids: string[]
  created_at: Date
  moved_at: Date
  state?: IWorkflowState
}
