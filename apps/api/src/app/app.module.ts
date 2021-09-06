import { classes } from '@automapper/classes';
import { mapFrom } from '@automapper/core';
import { AutomapperModule, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { QuestionAnswerDto } from './question-answers/dto/question-answer.dto';
import { QuestionAnswer } from './question-answers/entities/question-answer.entity';
import { QuestionAnswersModule } from './question-answers/question-answers.module';
import { CreateQuestionDto } from './questions/dto/create-question.dto';
import { UpdateQuestionDto } from './questions/dto/update-question.dto';
import { Question } from './questions/entities/question.entity';
import { QuestionsModule } from './questions/questions.module';
import { CreateSessionDto } from './sessions/models/create-session.dto';
import { Session } from './sessions/models/entity/session.entity';
import { UpdateSessionDto } from './sessions/models/update-session.dto';
import { SessionsModule } from './sessions/sessions.module';
import { UserDto } from './users/models/user.dto';
import { User } from './users/models/user.entity';
import { UserResource } from './users/models/user.resource';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_SCHEMA'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AutomapperModule.forRoot({
      options: [{name: 'immino', pluginInitializer: classes}],
      singular: true,
    }),
    AuthModule,
    UserModule,
    SessionsModule,
    QuestionsModule,
    QuestionAnswersModule,
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {
  constructor(@InjectMapper() private readonly mapper: Mapper) {
    mapper.createMap(CreateSessionDto, Session).forMember(
      (session) => session.createdBy,
      mapFrom((createSessionDto) => createSessionDto.createdBy),
    );

    mapper.createMap(UpdateSessionDto, Session, {extends: [mapper.getMapping(CreateSessionDto, Session)]})
      .forMember(
        (session) => session.createdBy,
        mapFrom((updateSessionDto) => updateSessionDto.createdBy),
      );

    mapper.createMap(UserDto, User);
    mapper.createMap(User, UserResource).forMember(
      (userResource) => userResource.fullName,
      mapFrom((user) => `${ user.firstName } ${ user.lastName }`),
    );

    mapper.createMap(CreateQuestionDto, Question).forMember(
      (question) => question.createdBy,
      mapFrom((createQuestionDto) => createQuestionDto.createdBy),
    );

    mapper.createMap(UpdateQuestionDto, Question).forMember(
      (question) => question.createdBy,
      mapFrom((updateQuestionDto) => updateQuestionDto.createdBy),
    );

    mapper.createMap(QuestionAnswerDto, QuestionAnswer);
  }
}
