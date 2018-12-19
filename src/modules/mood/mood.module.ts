import { Module } from '@nestjs/common';
import { UserModule } from "../user";
import { MoodController } from './mood.controller';
import { MoodService } from './mood.service';
import { MoodRepository } from './mood.repository';
import { UserMoodFactory } from './factory/UserMoodFactory';

@Module({
  imports: [UserModule],
  controllers: [MoodController],
  providers: [
    MoodService,
    MoodRepository,
    UserMoodFactory,
  ],
})
export class MoodModule {}
