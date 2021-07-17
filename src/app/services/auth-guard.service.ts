import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {


  constructor (private route: ActivatedRoute, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.isLogin()) return true;

     this.router.navigate([ 'login'], {queryParams: {returnUrl: state.url}});
    return false;
  }


  isLogin(){
    const helper = new JwtHelperService();
    let user = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null;
    if(!user) return false;

    let token = user.token;

    if(!token)
      return false ;

    const isExpired = helper.isTokenExpired(token);

    return !isExpired;
  }

  getToken(){
    let user = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null;
    if(!user) return false;
    return user.token
  }
}
