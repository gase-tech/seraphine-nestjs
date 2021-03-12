import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { QuestionAnswerDto } from './dto/question-answer.dto';
import { QuestionAnswer } from './entities/question-answer.entity';
import { QuestionAnswersService } from './question-answers.service'

@Controller('question-answers')
export class QuestionAnswersController {
  constructor(
    private readonly questionAnswersService: QuestionAnswersService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
  }

  @Post()
  create(@Body() questionAnswerDto: QuestionAnswerDto) {
    const questionAnswer = this.mapper.map(questionAnswerDto, QuestionAnswer, QuestionAnswerDto);
    return this.questionAnswersService.create(questionAnswer);
  }

  @Get()
  findAll() {
    return this.questionAnswersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionAnswersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() questionAnswerDto: QuestionAnswerDto) {
    const questionAnswer = this.mapper.map(questionAnswerDto, QuestionAnswer, QuestionAnswerDto);
    return this.questionAnswersService.update(id, questionAnswer);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.questionAnswersService.remove(id);
  }
}
