import { Controller, Get, Param } from "@nestjs/common";
import { ClubhouseService } from "../clubhouse/clubhouse.service";
import { IIteration } from "./types/iteration.type";
import { IStory } from "./types/story.type";
import { IWorkflowState } from "./types/workflow-state.type";

@Controller("iterations")
export class IterationsController {
  constructor(private readonly clubhouse: ClubhouseService) {}

  @Get()
  public async getIterations(): Promise<IIteration[]> {
    console.log('here');
    const iterations: IIteration[] = await this.clubhouse.getIterations();
    return this.clubhouse.filterIterations(iterations);
  }

  @Get(":id/stories")
  public async getIteration(@Param("id") id: number) {
    const workflowStates: IWorkflowState[] = await this.clubhouse.getWorkflowStates();
    const stories: IStory[] = await this.clubhouse.getIterationStories(
      id,
      workflowStates
    );
    console.log(stories);
    return this.clubhouse.filterStories(stories);
  }
}
