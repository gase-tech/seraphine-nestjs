import { mapFrom } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserDto } from '../models/user.dto';
import { User } from '../models/user.entity';
import { UserResource } from '../models/user.resource';
import { UserService } from '../services/user.service'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService, @InjectMapper() private mapper: Mapper) {
    mapper.createMap(UserDto, User);
    mapper.createMap(User, UserResource)
      .forMember(userResource => userResource.fullName, mapFrom(user => `${user.firstName} ${user.lastName}`));
  }

  @Post()
  create(@Body() userDto: UserDto): Observable<UserResource> {
    const user = this.mapper.map(userDto, User, UserDto);
    return this.userService
      .create(user)
      .pipe(map((user: User) => this.mapper.map(user, UserResource, User)));
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<UserResource> {
    return this.userService
      .findOne(id)
      .pipe(map((user: User) => this.mapper.map(user, UserResource, User)));
  }

  @Get(':username')
  findOneByUsername(@Param('username') username: string): Observable<UserResource> {
    return this.userService
      .findOneByUsername(username)
      .pipe(map((user: User) => this.mapper.map(user, UserResource, User)));
  }

  @Get(':email')
  findOneByEmail(@Param('email') username: string): Observable<UserResource> {
    return this.userService
      .findOneByEmail(username)
      .pipe(map((user: User) => this.mapper.map(user, UserResource, User)));
  }

  @Get()
  findAll(): Observable<UserResource[]> {
    return this.userService
      .findAll()
      .pipe(map((user: Array<User>) => this.mapper.mapArray(user, UserResource, User)));
  }

  @Put(':id')
  updateOne(@Param('id') id: number, @Body() userDto: UserDto): Observable<UpdateResult> {
    const user = this.mapper.map(userDto, User, UserDto);
    return this.userService.updateOne(id, user);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number): Observable<DeleteResult> {
    return this.userService.delete(id);
  }
}
