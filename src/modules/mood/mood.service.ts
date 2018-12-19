import { Injectable } from '@nestjs/common';
import { UserMood } from './entity/UserMood';
import { MoodRepository } from './mood.repository';

@Injectable()
export class MoodService {
  constructor(private readonly moodRepository: MoodRepository) {}

  async getMood(): Promise<UserMood> {
      return await this.moodRepository.getMood();
  }

  saveMood(userMood: UserMood): Promise<string> {
    return new Promise<string>(resolve => {
      resolve('' + Math.round(Math.random() * 1000));
    });
  }
}
