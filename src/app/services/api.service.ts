import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {addMainCategoryUrl, getSpecificMainCategoryNamesUrl} from 'src/app/backend/api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
lang = "0";

  constructor(private http: HttpClient) { }

  // post 
  addMainCategory(Form){
    Form.append('lang' , this.lang);
    return this.http.post(addMainCategoryUrl, Form);
  }

  getSpecificMainCategory(id){
    return this.http.get(getSpecificMainCategoryNamesUrl +id).pipe(map((res:any)=>res.data))
  }

}
