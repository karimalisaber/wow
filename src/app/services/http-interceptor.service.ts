import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';

@Injectable()
export class HttpInterceptorService {

  constructor(private auth: AuthGuardService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let token = this.auth.getToken();

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(tokenizedReq);
  }
}
