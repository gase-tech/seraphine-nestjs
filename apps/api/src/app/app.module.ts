import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { QuestionsModule } from './questions/questions.module';
import { SessionsModule } from "./sessions/sessions.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get("DATABASE_HOST"),
        port: configService.get("DATABASE_PORT"),
        username: configService.get("DATABASE_USER"),
        password: configService.get("DATABASE_PASSWORD"),
        database: configService.get("DATABASE_SCHEMA"),
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
    AutomapperModule.forRoot({
      options: [{ name: "immino", pluginInitializer: classes }],
      singular: true,
    }),
    AuthModule,
    UserModule,
    SessionsModule,
    QuestionsModule,
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
