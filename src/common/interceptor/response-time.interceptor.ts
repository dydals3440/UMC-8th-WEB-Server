import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const reqTime = Date.now();

    // Pipe는 순서대로 실행함.
    // 바로 응답을 받음.
    return next.handle().pipe(
      // delay(1000),
      tap(() => {
        const respTime = Date.now();
        const diff = respTime - reqTime; // res: ms

        if (diff > 1000) {
          console.log(`!!!TIMEOUT!!! [${req.method} ${req.path}] ${diff}ms`);

          throw new InternalServerErrorException('시간이 너무 오래걸렸습니다!');
        } else {
          console.log(`[${req.method} ${req.path}] ${diff}ms`);
        }
      }),
    );
  }
}
