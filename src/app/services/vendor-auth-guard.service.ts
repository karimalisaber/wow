import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VendorAuthGuardService {

  constructor (private route: ActivatedRoute, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot){
    if (this.isVendor()) return true;

     this.router.navigate([ 'login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  isVendor(){
    let user = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null;
    if(!user) return false;

    let role = +user.role;
    if(role === 3)
      return true ;

    return false
  }
}
