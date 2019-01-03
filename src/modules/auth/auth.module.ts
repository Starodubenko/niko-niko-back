import {Module} from "@nestjs/common";
import {AuthGuard} from "./auth.guard";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {UserModule} from "../user";

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    exports: [AuthService],
})
export class AuthModule {}