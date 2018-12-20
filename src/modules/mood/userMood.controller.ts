import {Controller, Get, HttpException, Param, Query} from '@nestjs/common';
import * as moment from 'moment';
import {UserMood} from './entity/UserMood';
import {MoodService} from './mood.service';
import {IUserMoodGetQuery} from "./interface";

@Controller('/api/mood/user')
export class UserMoodController {

    constructor(private readonly moodService: MoodService) {
    }

    @Get(':id')
    async getUserMoodList(@Param('id') userId: string, @Query() query: IUserMoodGetQuery): Promise<UserMood[]> {
        console.log('getUserMoodList', userId, query);
        const from = moment(query.from).toDate();
        const to = moment(query.to).toDate();

        try {
            return await this.moodService.getUserMoodRange(userId, from, to);
        } catch (error) {
            throw new HttpException('', 500);
        }
    }

    @Get(':id/current')
    async getCurrentUserMood(@Param('id') userId: string): Promise<UserMood> {
        try {
            return await this.moodService.getCurrentMoodByUserId(userId);
        } catch (error) {
            throw new HttpException('', 500);
        }
    }
}
