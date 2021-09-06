import { from, Observable } from 'rxjs';
import { Question } from '../entities/question.entity';

export const mockQuestionRepository = () => ({
  findAll: (): Observable<Array<Question>> => {
    return from([]);
  },
});
