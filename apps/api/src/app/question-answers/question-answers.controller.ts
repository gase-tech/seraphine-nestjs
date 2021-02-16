import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { QuestionAnswerDto } from './dto/question-answer.dto';
import { QuestionAnswersService } from './question-answers.service'

@Controller('question-answers')
export class QuestionAnswersController {
  constructor(private readonly questionAnswersService: QuestionAnswersService) {}

  @Post()
  create(@Body() questionAnswerDto: QuestionAnswerDto) {
    return this.questionAnswersService.create(questionAnswerDto);
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
  update(@Param('id') id: string, @Body() questionAnswerDto: QuestionAnswerDto) {
    return this.questionAnswersService.update(+id, questionAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionAnswersService.remove(+id);
  }
}
