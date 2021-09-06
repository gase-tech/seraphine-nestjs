import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { Session } from '../models/entity/session.entity';

@Injectable()
export class SessionsService {
  constructor(@InjectRepository(Session) private readonly sessionRepository: Repository<Session>) {}

  create(session: Session) {
    return from(this.sessionRepository.save(session));
  }

  findAll() {
    const findAll = this.sessionRepository.find();
    return from(findAll);
  }

  findOne(id: number) {
    return from(this.sessionRepository.findOne(id));
  }

  update(id: number, session: Session) {
    return from(this.sessionRepository.update(id, session));
  }

  remove(id: number) {
    return from(this.sessionRepository.softDelete({ id }));
  }
}
