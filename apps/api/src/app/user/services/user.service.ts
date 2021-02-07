import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { map, switchMap } from 'rxjs/operators';
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { LoginResource } from '../../auth/models/login.resource';
import { AuthService } from "../../auth/services/auth.service";
import { User } from "../models/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly authService: AuthService
  ) {
  }

  findAll(): Observable<Array<User>> {
    return from(this.usersRepository.find());
  }

  findOne(id: number): Observable<User> {
    return from(this.usersRepository.findOne(id));
  }

  findOneByUsername(username: string): Observable<User> {
    return from(this.usersRepository.findOne({ username }));
  }

  findOneByEmail(email: string): Observable<User> {
    return from(this.usersRepository.findOne({ email }));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.usersRepository.delete(id));
  }

  updateOne(id: number, user: User): Observable<UpdateResult> {
    delete user.password;
    delete user.email;

    return from(this.usersRepository.update(id, user));
  }

  create(user: User): Observable<User> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((hashedPassword: string) => {
        user.password = hashedPassword;
        return from(this.usersRepository.save(user));
      })
    );
  }

  validateUser(username: string, password: string): Observable<User> {
    return this.findOneByUsername(username).pipe(
      switchMap(user => {
        return this.authService.comparePasswords(password, user.password).pipe(
          map(isMatched => isMatched ? user : null),
        )
      })
    )
  }

  login(user: User): Observable<LoginResource> {
    return this.validateUser(user.username, user.password).pipe(
      switchMap(validatedUser => {
        if (validatedUser) {
          return this.authService.generateJWT(validatedUser).pipe(
            map(jwt => ({access_token: jwt}))
          );
        } else {
          throw Error('User Validation Error');
        }
      })
    )
  }
}
