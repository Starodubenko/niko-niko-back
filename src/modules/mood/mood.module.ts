import {Module} from '@nestjs/common';
import {UserModule} from "../user";
import {MoodController} from './constoller/mood.controller';
import {MoodService} from './service/mood.service';
import {MoodRepository} from './repository/mood.repository';
import {UserMoodFactory} from './factory/UserMoodFactory';
import {UserMoodController} from "./constoller/userMood.controller";
import {MoodGateway} from "./websocket/mood.websocket";
import {AuthModule} from "../auth";

@Module({
    imports: [UserModule, AuthModule],
    controllers: [MoodController, UserMoodController],
    providers: [
        MoodService,
        MoodRepository,
        UserMoodFactory,
        MoodGateway,
    ],
})
export class MoodModule {
}
