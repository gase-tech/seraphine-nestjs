import { mapFrom } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Question } from './entities/question.entity';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    mapper.createMap(CreateQuestionDto, Question)
      .forMember(
        question => question.createdBy,
        mapFrom(createQuestionDto => createQuestionDto.createdBy),
      );
    mapper.createMap(UpdateQuestionDto, Question)
      .forMember(
        question => question.createdBy,
        mapFrom(updateQuestionDto => updateQuestionDto.createdBy),
      );
  }

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    const question = this.mapper.map(createQuestionDto, Question, CreateQuestionDto);
    return this.questionsService.create(question);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.questionsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateQuestionDto: UpdateQuestionDto) {
    const question = this.mapper.map(updateQuestionDto, Question, CreateQuestionDto);
    return this.questionsService.update(id, question);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.questionsService.remove(id);
  }
}
