import {Injectable} from '@nestjs/common';
import {UserMood} from '../entity/UserMood';
import {MoodRepository} from '../repository/mood.repository';
import {Observable, Subject} from "rxjs";
import {combineAll, mergeAll} from "rxjs/operators";

@Injectable()
export class MoodService {
    constructor(private readonly moodRepository: MoodRepository) {
    }

    getUserMoodRange(userId: string, from?: Date, to?: Date): Observable<UserMood[]> {
        return this.moodRepository.getMoodList(
            userId,
            {
                from,
                to
            });
    }

    getUsersMoodRange(userIds: string[], from?: Date, to?: Date): Observable<UserMood[][]> {
        const result: Subject<Observable<UserMood[]>> = new Subject();

        userIds.forEach(userId => {
            result.next(this.getUserMoodRange(userId, from, to))
        });

        return result.pipe(combineAll());
    }

    getCurrentMoodByUserId(userId: string): Observable<UserMood> {
        const currentDate = new Date();
        const moodArray = this.moodRepository.getMoodList(userId, {from: currentDate, to: currentDate});

        return moodArray.pipe(mergeAll());
    }

    saveMood(userMood: UserMood): Observable<string> {
        return this.moodRepository.saveMood(userMood);
    }
}
