import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { JwtUtilsService } from "../../auth/jwt-utils/jwt-utils.service";
import { User } from "../models/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtUtilsService: JwtUtilsService
  ) {
  }

  findAll(): Observable<Array<User>> {
    return from(this.usersRepository.find());
  }

  findOne(id: number): Observable<User> {
    return from(this.usersRepository.findOne(id));
  }

  findOneByUsername(username: string) {
    return from(this.usersRepository.findOneOrFail({ username }));
  }

  findOneByEmail(email: string): Observable<User> {
    return from(this.usersRepository.findOneOrFail({ email }));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.usersRepository.delete(id)); // TODO: soft delete?
  }

  updateOne(id: number, user: User): Observable<UpdateResult> {
    delete user.password;
    delete user.email;

    return from(this.usersRepository.update(id, user));
  }

  create(user: User): Observable<User> {
    return this.jwtUtilsService.hashPassword(user.password).pipe(
      switchMap((hashedPassword: string) => {
        user.password = hashedPassword;
        return from(this.usersRepository.save(user));
      })
    );
  }

  validateUser(username: string, password: string): Observable<User> {
    return this.findOneByUsername(username).pipe(
      switchMap(user => {
        return this.jwtUtilsService.comparePasswords(password, user.password).pipe(
          map(isMatched => isMatched ? user : null)
        );
      })
    );
  }
}
