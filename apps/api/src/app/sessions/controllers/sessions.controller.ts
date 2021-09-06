import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { NotFoundInterceptor } from '../../interceptors/not-found.interceptor';
import { CreateSessionDto } from '../models/create-session.dto';
import { Session } from '../models/entity/session.entity';
import { UpdateSessionDto } from '../models/update-session.dto';
import { SessionsService } from '../services/sessions.service';

@Controller('session')
@UseInterceptors(new NotFoundInterceptor('No session found for given id'))
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService, @InjectMapper() private readonly mapper: Mapper) {}

  @Post()
  @HttpCode(201)
  create(@Body() createSessionDto: CreateSessionDto) {
    const session = this.mapper.map(createSessionDto, Session, CreateSessionDto);
    console.log({ session });
    return this.sessionsService.create(session);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  @HttpCode(404)
  @HttpCode(200)
  findOne(@Param('id') id: number) {
    return this.sessionsService.findOne(id);
  }

  @Put(":id")
  @HttpCode(404)
  @HttpCode(200)
  update(@Param("id") id: number, @Body() updateSessionDto: UpdateSessionDto) {
    const session = this.mapper.map(updateSessionDto, Session, UpdateSessionDto);
    return this.sessionsService.update(id, session);
  }

  @Delete(':id')
  @HttpCode(404)
  @HttpCode(200)
  remove(@Param('id') id: number) {
    return this.sessionsService.remove(id);
  }
}
