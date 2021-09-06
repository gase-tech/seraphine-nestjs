import { Body, Controller, Post } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { LoginDto } from '../models/login.dto';
import { LoginResource } from '../models/login.resource';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): Observable<LoginResource> {
    if (!loginDto.username) {
      return throwError('username is invalid');
    }
    return this.authService.login(loginDto);
  }
}
