import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { getMainCategoryNamesUrl } from '../backend/api';
import { getAllHomeSlidersUrl } from './../backend/api';

@Injectable({
  providedIn: 'root'
})
export class ApiGetService {
  constructor(private http: HttpClient) { }

  getMainCategoriesNames(){
    return this.http.get(getMainCategoryNamesUrl).pipe(map((res:any)=>res.data));
  }

  
  getAllHomeSliders(){
    return this.http.get(getAllHomeSlidersUrl).pipe(map((res:any)=>res.data));
  }

}
