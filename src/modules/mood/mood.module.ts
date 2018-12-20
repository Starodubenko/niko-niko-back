import { Module } from '@nestjs/common';
import { UserModule } from "../user";
import { MoodController } from './mood.controller';
import { MoodService } from './mood.service';
import { MoodRepository } from './mood.repository';
import { UserMoodFactory } from './factory/UserMoodFactory';
import { UserMoodController } from "./userMood.controller";

@Module({
  imports: [UserModule],
  controllers: [MoodController, UserMoodController],
  providers: [
    MoodService,
    MoodRepository,
    UserMoodFactory,
  ],
})
export class MoodModule {}
