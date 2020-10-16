import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { updateMainCategoryUrl, updateVendorStatusUrl, updateItemStatusUrl, updateItemStatusForVendorUrl } from './../backend/api';

@Injectable({
  providedIn: 'root'
})
export class UpdateApiService {
lang = localStorage.getItem('lang') || '0';
  constructor(private http: HttpClient) { }

  updateMainCategory(id, form){
    form.append('lang' , this.lang);

   return this.http.post(updateMainCategoryUrl + id , form) 
  }

  updateVendorStatus(form){
   return this.http.post(updateVendorStatusUrl, form) 
  }

  
  updateItemStatus(form){
    return this.http.post(updateItemStatusUrl, form) 
  }

  updateItemStatusForVendor(form){
    return this.http.post(updateItemStatusForVendorUrl, form) 
  }

}
