import { mapFrom } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Controller, Post, Body} from '@nestjs/common';
import { QuestionAnswer } from '../../question-answers/entities/question-answer.entity';
import { Session } from '../models/entity/session.entity';
import { QuestionAnswerDto } from '../../question-answers/dto/question-answer.dto';
import { SessionsService } from '../services/sessions.service';
import { CreateSessionDto } from '../models/create-session.dto';

@Controller("sessions")
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    mapper.createMap(CreateSessionDto, Session)
      .forMember(
        session => session.questionAnswers,
        mapFrom(createSessionDto => createSessionDto.questionAnswers)
      );
    mapper.createMap(QuestionAnswerDto, QuestionAnswer);
  }

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    const session = this.mapper.map(createSessionDto, Session, CreateSessionDto);
    console.log({session});
    return this.sessionsService.create(session);
  }

  // @Get()
  // findAll() {
  //   return this.sessionsService.findAll();
  // }
  //
  // @Get(":id")
  // findOne(@Param("id") id: number) {
  //   return this.sessionsService.findOne(id);
  // }
  //
  // @Put(":id")
  // update(@Param("id") id: number, @Body() updateSessionDto: UpdateSessionDto) {
  //   return this.sessionsService.update(id, updateSessionDto);
  // }
  //
  // @Delete(":id")
  // remove(@Param("id") id: number) {
  //   return this.sessionsService.remove(id);
  // }
}
