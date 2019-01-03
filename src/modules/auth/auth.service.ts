import {Injectable} from "@nestjs/common";
import {map} from "rxjs/operators";
import {sign, verify} from "jsonwebtoken";
import {UserService} from "../user";
import {SECRET} from "./constants";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService){}

    getToken(login: string, password: string){
        return this.userService.findByCredentials(login, password)
            .pipe(
                map(user => sign({
                    data: user
                }, SECRET))
            )
    }

    validateRequest(request: any) {
        const authorizationHeader = request.headers && request.headers.authorization ||
                                    request.handshake && request.handshake.query.token;

        if (!authorizationHeader) {
            return false;
        }

        const token = authorizationHeader.split(' ')[1];
        return !!verify(token, SECRET);
    }
}