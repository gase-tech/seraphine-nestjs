import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { from, Observable } from "rxjs";
import { User } from "../../users/models/user.entity";

@Injectable()
export class JwtUtilsService {
  constructor(private readonly jwtService: JwtService) {}

  generateJWT(user: User): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  hashPasswordSync(password: string): string {
    return bcrypt.hashSync(password, 12);
  }

  comparePasswords(newPassword: string, hashedPassword: string): Observable<boolean> {
    return from(bcrypt.compare(newPassword, hashedPassword));
  }
}
