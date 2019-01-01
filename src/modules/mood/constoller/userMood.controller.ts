import {Controller, Get, HttpException, Param, Query} from '@nestjs/common';
import * as moment from 'moment';
import {UserMood} from '../entity/UserMood';
import {MoodService} from '../service/mood.service';
import {IUserMoodGetQuery} from "../interface";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Controller('/api/moodLevel/user')
export class UserMoodController {

    constructor(private readonly moodService: MoodService) {
    }

    @Get(':id')
    getUserMoodList(@Param('id') userId: string, @Query() query: IUserMoodGetQuery): Observable<UserMood[]> {
        console.log('getUserMoodList', userId, query);
        const from = moment(query.from).toDate();
        const to = moment(query.to).toDate();

        return this.moodService.getUserMoodRange(userId, from, to)
            .pipe(
                catchError(e => {
                    throw new HttpException(e, 500);
                })
            )
    }

    @Get(':id/current')
    getCurrentUserMood(@Param('id') userId: string): Observable<UserMood> {
        return this.moodService.getCurrentMoodByUserId(userId)
            .pipe(
                catchError(e => {
                    throw new HttpException(e, 500);
                })
            )
    }
}
