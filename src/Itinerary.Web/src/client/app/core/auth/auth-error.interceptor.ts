import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .catch((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            const router = this.injector.get(Router);
            router.navigate(['/signin']);
          }
        }
        return Observable.throw('Request is not authorized');
      });
  }
}
