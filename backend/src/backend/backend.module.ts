import { Module } from "@nestjs/common";
import { BackendController } from "./backend.controller";
import { ClubhouseService } from "../clubhouse/clubhouse.service";

@Module({
  controllers: [BackendController],
  providers: [ClubhouseService]
})
export class BackendModule {}
