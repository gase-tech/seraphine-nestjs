import { Module } from "@nestjs/common";
import { JwtUtilsModule } from "./jwt-utils/jwt-utils.module";
import { UserModule } from "../users/user.module";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";

@Module({
  imports: [JwtUtilsModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
