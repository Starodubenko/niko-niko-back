import {Injectable} from '@nestjs/common';
import {UserMood} from './entity/UserMood';
import {MoodRepository} from './mood.repository';

@Injectable()
export class MoodService {
    constructor(private readonly moodRepository: MoodRepository) {
    }

    async getUserMoodRange(userId: string, from?: Date, to?: Date): Promise<UserMood[]> {
        const moodArray = await this.moodRepository.getMoodList(
            userId,
            {
                from,
                to
            });

        return moodArray || [];
    }

    async getCurrentMoodByUserId(userId: string): Promise<UserMood> {
        const currentDate = new Date();
        const moodArray = await this.moodRepository.getMoodList(userId, {from: currentDate, to: currentDate});

        return moodArray && moodArray[0] || null;
    }

    async saveMood(userMood: UserMood): Promise<string> {
        return await this.moodRepository.saveMood(userMood);
    }
}
