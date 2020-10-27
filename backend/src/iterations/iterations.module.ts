import { Module } from "@nestjs/common";
import { IterationsController } from "./iterations.controller";
import { ClubhouseService } from "../clubhouse/clubhouse.service";

@Module({
  controllers: [IterationsController],
  providers: [ClubhouseService]
})
export class IterationsModule {}
