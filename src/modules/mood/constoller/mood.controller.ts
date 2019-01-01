import {Body, Controller, HttpException, Post, UsePipes} from '@nestjs/common';
import {MoodService} from '../service/mood.service';
import {UserMoodDto} from '../dto/UserMood.dto';
import {UserMoodFactory} from '../factory/UserMoodFactory';
import {PostUserMoodValidator} from '../httpValidation/PostUserMoodValidator';
import {catchError, map, switchMap} from "rxjs/operators";

@Controller('/api/moodLevel')
export class MoodController {

    constructor(private readonly moodService: MoodService,
                private readonly userMoodFactory: UserMoodFactory) {
    }

    @Post()
    @UsePipes(PostUserMoodValidator)
    async postMood(@Body() userMoodDto: UserMoodDto) {
        this.userMoodFactory.getUserMoodByDto(userMoodDto)
            .pipe(
                switchMap(userMood => this.moodService.saveMood(userMood)),
                map(userId => ({
                    entityId: userId,
                })),
                catchError(e => {
                    throw new HttpException(e, 500);
                })
            );
    }
}
