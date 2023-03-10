import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try {
      const token = this.cookieService.get('token');      
      let newRequest = request;
      newRequest = request.clone({
        setHeaders: {
          "x-token": token
        }
      })
      return next.handle(newRequest);
    } catch (error) {
      return next.handle(request);
    }
  }

}
