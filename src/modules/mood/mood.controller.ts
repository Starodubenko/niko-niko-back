import {Body, Controller, HttpException, Post, UsePipes} from '@nestjs/common';
import {MoodService} from './mood.service';
import {UserMoodDto} from './dto/UserMood.dto';
import {UserMoodFactory} from './factory/UserMoodFactory';
import {PostUserMoodValidator} from './httpValidation/PostUserMoodValidator';

@Controller('/api/mood')
export class MoodController {

  constructor(private readonly moodService: MoodService,
              private readonly userMoodFactory: UserMoodFactory) {}

  @Post()
  @UsePipes(PostUserMoodValidator)
  async postMood(@Body() userMoodDto: UserMoodDto) {
    try {
      const userMood = await this.userMoodFactory.getUserMood(userMoodDto);
      const userId = await this.moodService.saveMood(userMood);

      return {
        entityId: userId,
      };
    } catch (error) {
      throw new HttpException('', 500);
    }
  }
}
