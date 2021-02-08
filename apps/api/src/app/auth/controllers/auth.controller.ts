import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/types";
import { Body, Controller, Post } from "@nestjs/common";
import { Observable } from "rxjs";
import { LoginDto } from "../models/login.dto";
import { LoginResource } from "../models/login.resource";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(@InjectMapper() private mapper: Mapper, private readonly authService: AuthService) {
  }

  @Post("login")
  login(@Body() loginDto: LoginDto): Observable<LoginResource> {
    return this.authService.login(loginDto);
  }
}
