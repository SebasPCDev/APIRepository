import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class DeletePassAdminInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => {
            if (item.password) {
              delete item.password;
            }
            return item;
          });
        } else {
          delete data.password;
          delete data.admin;
          return data;
        }
      }),
    );
  }
}
