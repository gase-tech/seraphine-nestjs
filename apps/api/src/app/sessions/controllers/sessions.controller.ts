import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/types";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateSessionDto } from "../models/create-session.dto";
import { Session } from "../models/entity/session.entity";
import { SessionsService } from "../services/sessions.service";

@Controller("sessions")
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    const session = this.mapper.map(
      createSessionDto,
      Session,
      CreateSessionDto
    );
    console.log({ session });
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
