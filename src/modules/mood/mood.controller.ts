import { Body, Controller, Get, HttpException, Post, Query } from '@nestjs/common';
import { IUserMoodGetQuery } from './interface/IUserMoodGetParams.interface';
import { UserMood } from './entity/UserMood';
import { MoodService } from './mood.service';
import { UserMoodDto } from './dto/UserMoodDto';
import { UserMoodFactory } from './factory/UserMoodFactory';

@Controller('/api/mood')
export class MoodController {

  constructor(private readonly moodService: MoodService,
              private readonly userMoodFactory: UserMoodFactory) {}

  @Get()
  async getUserMood(@Query() userMoodGetParams: IUserMoodGetQuery): Promise<UserMood> {
    try {
      return await this.moodService.getMood();
    } catch (error) {
      throw new HttpException('qweqwe', 500);
    }
  }

  @Post()
  // @UsePipes(PostUserMoodValidator)
  async postMood(@Body() userMoodDto: UserMoodDto) {
    try {
      const userMood = await this.userMoodFactory.getUserMood(userMoodDto);
      const userId = await this.moodService.saveMood(userMood);

      return {
        code: 200,
        entityId: userId,
      };
    } catch (error) {
      throw new HttpException('', 500);
    }
  }
}
