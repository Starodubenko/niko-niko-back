import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse
} from "@nestjs/websockets";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {MoodService} from "../service/mood.service";
import {UserMood} from "../entity/UserMood";
import {
    CURRENT_OWN_MOOD_LEVEL_WS_EVENT,
    SELECT_USER_MOOD,
    USER_MOOD_RANDE_WS_EVENT,
    USERS_MOOD_RANGE_WS_EVENT
} from "./constants";
import {Query} from "@nestjs/common";
import {UserMoodFactory} from "../factory/UserMoodFactory";
import {ShortUserMoodDto} from "../dto/UserMood.dto";

@WebSocketGateway({
    namespace: '/mood'
})
export class MoodGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server;

    constructor(private readonly moodService: MoodService,
                private readonly userMoodFactory: UserMoodFactory) {}

    afterInit(server): any {
        // debugger;
    }

    handleConnection(client, ...args: any[]): any {
        // debugger;
    }

    handleDisconnect(client): any {
        // debugger;
    }

    @SubscribeMessage(CURRENT_OWN_MOOD_LEVEL_WS_EVENT)
    currentOwnMoodLevel(client, data, @Query() query): Observable<WsResponse<string | null>> {
        return this.moodService.getCurrentMoodByUserId(client.handshake.query.userId)
            .pipe(
                map(userMood => {
                    return {
                        event: CURRENT_OWN_MOOD_LEVEL_WS_EVENT,
                        data: userMood && userMood.mood.toString() || null
                    }
                })
            );
    }

    @SubscribeMessage(USER_MOOD_RANDE_WS_EVENT)
    moodArrayByUserId(client, data = {from: null, to: null}): Observable<WsResponse<UserMood[]>> {
        return this.moodService.getUserMoodRange(client.handshake.query.userId, data.from, data.to)
            .pipe(
                map((userMoodArray) => {
                    return { event: CURRENT_OWN_MOOD_LEVEL_WS_EVENT, data: userMoodArray }
                })
            );
    }

    @SubscribeMessage(USERS_MOOD_RANGE_WS_EVENT)
    moodArrayByUserIds(client, data): Observable<WsResponse<UserMood[][]>> {
        return this.moodService.getUsersMoodRange(data.userIds, data.from, data.to)
            .pipe(
                map(userMoodMatrix => {
                    return { event: CURRENT_OWN_MOOD_LEVEL_WS_EVENT, data: userMoodMatrix }
                })
            );
    }

    @SubscribeMessage(SELECT_USER_MOOD)
    setCurrentMood(client, data: ShortUserMoodDto): Observable<WsResponse<string>> {
        return this.userMoodFactory.getUserMoodByShortDto(data)
            .pipe(
                switchMap(userMood => this.moodService.saveMood(userMood)
                    .pipe(
                        map(userMoodId => {
                            return { event: SELECT_USER_MOOD, data: userMoodId }
                        })
                    ))
            );
    }
}