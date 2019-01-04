import {Body, Controller, Post} from '@nestjs/common';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Controller('/api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('signIn')
    signIn(@Body('username') username: string, @Body('password') password: string): Observable<any> {
        return this.authService.getToken(username, password)
            .pipe(
                map(token => ({token}))
            );
    }

    @Post('checkUrlPathAccessibility')
    checkUrlPathAccessibility(@Body('token') token: string, @Body('path') path: string): boolean {
        return this.authService.checkUrlPathAccessibility(token, path);
    }
}
