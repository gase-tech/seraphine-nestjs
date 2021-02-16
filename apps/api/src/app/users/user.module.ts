import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtUtilsModule } from "../auth/jwt-utils/jwt-utils.module";
import { UsersController } from "./controllers/users.controller";
import { User } from "./models/user.entity";
import { UsersService } from "./services/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtUtilsModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UserModule {}
