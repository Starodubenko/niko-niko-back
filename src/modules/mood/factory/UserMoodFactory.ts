import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { UserMoodDto } from '../dto/UserMood.dto';
import { UserMood } from '../entity/UserMood';
import { UserService } from '../../user';

@Injectable()
export class UserMoodFactory {
  constructor(private readonly userService: UserService) {}

  async getUserMood(userMoodDto: UserMoodDto): Promise<UserMood> {
    const user = await this.userService.getById(userMoodDto.userId);
    const moodDate = moment(userMoodDto.date).toDate();

    return new UserMood(null, userMoodDto.mood, user, moodDate);
  }
}
