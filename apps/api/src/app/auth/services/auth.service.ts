import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { JwtUtilsService } from "../jwt-utils/jwt-utils.service";
import { UsersService } from "../../user/services/users.service";
import { LoginDto } from "../models/login.dto";
import { LoginResource } from "../models/login.resource";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtUtilsService: JwtUtilsService) {
  }

  login(loginDto: LoginDto): Observable<LoginResource> {
    return this.usersService.validateUser(loginDto.username, loginDto.password).pipe(
      switchMap(validatedUser => {
        if (validatedUser) {
          return this.jwtUtilsService.generateJWT(validatedUser).pipe(
            map(jwt => ({ access_token: jwt }))
          );
        } else {
          throw Error("User Validation Error");
        }
      })
    );
  }
}
