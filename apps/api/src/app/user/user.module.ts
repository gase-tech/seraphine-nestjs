import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtUtilsModule } from "../jwt-utils/jwt-utils.module";
import { UsersController } from "./controllers/users.controller";
import { User } from "./models/user.entity";
import { UserService } from "./services/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtUtilsModule],
  providers: [UserService],
  controllers: [UsersController],
  exports: [UserService]
})
export class UserModule {}
