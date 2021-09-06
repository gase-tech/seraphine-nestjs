import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  constructor(private errorMessage: string) {}

  intercept(context: ExecutionContext, next: CallHandler<never>): Observable<never> | Promise<Observable<never>> {
    return next.handle().pipe(
      tap((data: never) => {
        if (data === undefined) {
          throw new NotFoundException(this.errorMessage);
        }
      })
    );
  }
}
