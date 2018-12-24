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
import {map} from "rxjs/operators";
import {MoodService} from "../service/mood.service";
import {UserMood} from "../entity/UserMood";
import {CURRENT_MOOD_WS_EVENT, USER_MOOD_RANDE_WS_EVENT, USERS_MOOD_RANGE_WS_EVENT} from "./constants";
import {Query} from "@nestjs/common";

@WebSocketGateway({
    namespace: '/ownMood'
})
export class MoodGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server;

    constructor(private readonly moodService: MoodService) {}


    afterInit(server): any {
        // debugger;
    }

    handleConnection(client, ...args: any[]): any {
        // debugger;
    }

    handleDisconnect(client): any {
        // debugger;
    }

    @SubscribeMessage(CURRENT_MOOD_WS_EVENT)
    currentMood(client, data, @Query() query): Observable<WsResponse<UserMood>> {
        debugger;
        return this.moodService.getCurrentMoodByUserId(client.handshake.query.userId)
            .pipe(
                map(userMood => {
                    return { event: CURRENT_MOOD_WS_EVENT, data: userMood }
                })
            );
    }

    @SubscribeMessage(USER_MOOD_RANDE_WS_EVENT)
    moodArrayByUserId(client, data = {from: null, to: null}): Observable<WsResponse<UserMood[]>> {
        return this.moodService.getUserMoodRange(client.handshake.query.userId, data.from, data.to)
            .pipe(
                map((userMoodArray) => {
                    debugger;
                    return { event: CURRENT_MOOD_WS_EVENT, data: userMoodArray }
                })
            );
    }

    @SubscribeMessage(USERS_MOOD_RANGE_WS_EVENT)
    moodArrayByUserIds(client, data): Observable<WsResponse<UserMood[][]>> {
        return this.moodService.getUsersMoodRange(data.userIds, data.from, data.to)
            .pipe(
                map(userMoodMatrix => {
                    return { event: CURRENT_MOOD_WS_EVENT, data: userMoodMatrix }
                })
            );
    }
}