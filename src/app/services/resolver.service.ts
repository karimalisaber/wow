import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any>{
  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.getFakeData()
  }

  getFakeData(){
    let url = 'https://api.first.org/data/v1/countries'
    return this.http.get(url)
  }

}


export interface karim<k> {

  t()
}
