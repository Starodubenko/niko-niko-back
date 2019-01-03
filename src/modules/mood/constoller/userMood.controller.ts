import {Controller, Get, HttpException, Param, Query, UseGuards} from '@nestjs/common';
import * as moment from 'moment';
import {UserMood} from '../entity/UserMood';
import {MoodService} from '../service/mood.service';
import {IUserMoodGetQuery} from "../interface";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthGuard} from "../../auth";

@Controller('/api/moodLevel/user')
@UseGuards(AuthGuard)
export class UserMoodController {

    constructor(private readonly moodService: MoodService) {
    }

    @Get(':id')
    getUserMoodList(@Param('id') userId: string, @Query() query: IUserMoodGetQuery): Observable<UserMood[]> {
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
    getCurrentUserMood(@Param('id') userId: string): Observable<UserMood | null> {
        return new Observable((subscriber) => {
            this.moodService.getCurrentMoodByUserId(userId)
                .pipe(
                    catchError(e => {
                        throw new HttpException(e, 500);
                    })
                ).subscribe(data => {
                subscriber.next(data)
            });
            subscriber.complete();
        })
    }
}
