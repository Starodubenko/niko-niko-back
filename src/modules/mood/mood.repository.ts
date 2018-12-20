import {Injectable} from '@nestjs/common';
import * as moment from 'moment';
import {UserMood} from './entity/UserMood';
import {User} from '../user/entity';
import {IMoodRepositoryParams} from "./interface";

@Injectable()
export class MoodRepository {
    private moodArray = [
        new UserMood('1', 1, new User('1', 'John', 'Doe', 'Team_One'), moment(new Date()).subtract(1, 'd').toDate()),
        new UserMood('2', 1, new User('1', 'John', 'Doe', 'Team_One'), moment(new Date()).toDate()),
        new UserMood('3', 2, new User('2', 'Michael', 'Smith', 'Team_Two'), moment(new Date()).toDate()),
        new UserMood('4', 3, new User('3', 'Colin', 'Barker', 'Team_Three'), moment(new Date()).add(1, 'd').toDate()),
    ];

    async getMoodList(userId: string, params?: IMoodRepositoryParams): Promise<UserMood[]> {
        return new Promise<UserMood[]>((resolve) => {
            if (!params) {
                resolve(this.moodArray.filter(userMood => userMood.user.id == userId));
            }

            console.log(params);
            console.log(this.moodArray);

            resolve(this.moodArray.filter(userMood => {
                return userMood.user.id === userId
                       && moment(userMood.date)
                        .isBetween(
                            moment(params.from),
                            moment(params.to),
                            'day',
                            '[]'
                        )
            }));
        });
    }

    async saveMood(mood: UserMood): Promise<string> {
        return new Promise<string>((resolve) => {
            mood.id = '' + Math.round(Math.random() * 1000);
            this.moodArray.push(mood);
            resolve(mood.id);
        });
    }
}
