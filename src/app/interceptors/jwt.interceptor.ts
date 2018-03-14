import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '@app/services';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.injector.get(AuthService).getToken();
    req = req.clone({
      setHeaders: {
        authorization: `bearer ${token}`
      }
    });

    return next.handle(req);
  }
}
