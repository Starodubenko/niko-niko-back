import { Injectable } from '@nestjs/common';
import { UserMood } from './entity/UserMood';
import { User } from '../user/entity';

@Injectable()
export class MoodRepository {
  async getMood(): Promise<UserMood> {
      return new Promise<UserMood>((resolve) => {
        resolve(new UserMood(1, new User(), new Date()));
      });
  }
}
