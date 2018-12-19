import { Module } from '@nestjs/common';
import { UserModule, UserService } from '../user';
import { MoodController } from './mood.controller';
import { MoodService } from './mood.service';
import { MoodRepository } from './mood.repository';
import { UserMoodFactory } from './factory/UserMoodFactory';

@Module({
  imports: [],
  controllers: [MoodController],
  providers: [
    UserService,
    MoodService,
    MoodRepository,
    UserMoodFactory,
  ],
})
export class MoodModule {}
