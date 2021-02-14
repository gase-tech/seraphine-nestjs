import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SessionsService } from '../services/sessions.service';
import { CreateSessionDto } from '../models/create-session.dto';
import { UpdateSessionDto } from '../models/update-session.dto';

@Controller("sessions")
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.sessionsService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.sessionsService.remove(id);
  }
}
