import { Injectable } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private auth: AuthGuardService) { }

  intercept(req, next){
    let token = this.auth.getToken();

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` 
      }
    });

    return next.handle(tokenizedReq);
  }
}
