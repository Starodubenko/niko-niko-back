import {Controller, Param, Post} from '@nestjs/common';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Controller('/api/auth/login')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post()
    signIn(@Param('username') username: string, @Param('password') password: string): Observable<string> {
        return this.authService.getToken(username, password);
    }
}
