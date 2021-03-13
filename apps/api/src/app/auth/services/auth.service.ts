import { Injectable } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UsersService } from '../../users/services/users.service';
import { JwtUtilsService } from '../jwt-utils/jwt-utils.service';
import { LoginDto } from '../models/login.dto';
import { LoginResource } from '../models/login.resource';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtUtilsService: JwtUtilsService) {
  }

  login(loginDto: LoginDto): Observable<LoginResource> {
    return this.usersService.validateUser(loginDto.username, loginDto.password).pipe(
      switchMap(validatedUser => {
        if (validatedUser) {
          return this.jwtUtilsService.generateJWT(validatedUser).pipe(
            map(jwt => ({access_token: jwt})),
          );
        } else {
          return throwError(new Error('User Validation Error'));
        }
      }),
    );
  }
}
