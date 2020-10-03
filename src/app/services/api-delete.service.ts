import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { deleteMainCategoryUrl } from './../backend/api';

@Injectable({
  providedIn: 'root'
})
export class ApiDeleteService {

  constructor(private http: HttpClient) { }

  deleteMainCategory(id){
    return this.http.delete(deleteMainCategoryUrl+id)
  }
}
