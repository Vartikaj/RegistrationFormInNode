import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServicService } from './auth-servic.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthServicService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authHeader = this.auth.getToken();


    const authReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + authHeader
      )
    });

    return next.handle(authReq);

  }
}