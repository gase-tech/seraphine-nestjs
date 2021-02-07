import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  findAll(): Observable<Array<User>> {
    return from(this.usersRepository.find());
  }

  findOne(id: number): Observable<User> {
    return from(this.usersRepository.findOne(id));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.usersRepository.delete(id));
  }

  updateOne(id: number, user: User): Observable<UpdateResult> {
    return from(this.usersRepository.update(id, user));
  }

  create(user: User): Observable<User> {
    console.log({ user });
    return from(this.usersRepository.save(user));
  }
}
