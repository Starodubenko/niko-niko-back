import {Injectable} from '@nestjs/common';
import * as moment from 'moment';
import {UserMood} from '../entity/UserMood';
import {User} from '../../user/entity';
import {IMoodRepositoryParams} from "../interface";
import {BehaviorSubject, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class MoodRepository {
    private moodArray: UserMood[];
    private moodArrayObservable: BehaviorSubject<UserMood[]>;

    constructor() {
        this.moodArray = [
            new UserMood('1', 1, new User('1', 'John', 'Doe', 'Team_One'), moment(new Date()).subtract(1, 'd').toDate()),
            // new UserMood('2', 2, new User('1', 'John', 'Doe', 'Team_One'), moment(new Date()).toDate()),
            new UserMood('3', 2, new User('2', 'Michael', 'Smith', 'Team_Two'), moment(new Date()).toDate()),
            new UserMood('4', 3, new User('3', 'Colin', 'Barker', 'Team_Three'), moment(new Date()).add(1, 'd').toDate())
        ];

        this.moodArrayObservable = new BehaviorSubject(this.moodArray);
    }

    getMoodList(userId: string, params?: IMoodRepositoryParams): Observable<UserMood[]> {
        if (!params) {
            return this.moodArrayObservable
                .pipe(
                    map(arr =>
                        arr.filter(userMood => userMood.user.id == userId)
                    )
                )
        }

        return this.moodArrayObservable
            .pipe(
                map(arr =>
                    arr.filter(userMood => {
                        return userMood.user.id === userId
                            && moment(userMood.date)
                                .isBetween(
                                    moment(params.from),
                                    moment(params.to),
                                    'day',
                                    '[]'
                                )
                    })),
            )
    }

    saveMood(mood: UserMood): Observable<string> {
        mood.id = '' + Math.round(Math.random() * 1000);
        this.moodArray.push(mood);
        this.moodArrayObservable.next(this.moodArray);

        return of(mood.id);
    }
}
