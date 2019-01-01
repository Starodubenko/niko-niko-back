import {Injectable} from '@nestjs/common';
import * as moment from 'moment';
import {ShortUserMoodDto, UserMoodDto} from '../dto/UserMood.dto';
import {UserMood} from '../entity/UserMood';
import {UserService} from '../../user';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class UserMoodFactory {
    constructor(private readonly userService: UserService) {
    }

    getUserMoodByDto(userMoodDto: UserMoodDto): Observable<UserMood> {
        const currentDate = moment(userMoodDto.date).toDate();

        return this.userService.getById(userMoodDto.userId)
            .pipe(
                map(user => new UserMood(null, userMoodDto.moodLevel, user, currentDate))
            );
    }

    getUserMoodByShortDto(shortUserMoodDto: ShortUserMoodDto): Observable<UserMood> {
        const currentDate = moment(new Date()).toDate();

        return this.userService.getById(shortUserMoodDto.userId)
            .pipe(
                map(user => new UserMood(null, shortUserMoodDto.moodLevel, user, currentDate))
            );
    }
}
