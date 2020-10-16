import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { getBestBrandsUrl, getCategorySlidersUrl, getCategorySpecialImagesUrl, GetItemsUrl, getMainCategoryNamesUrl, getSubCategoriesOfSubCategoryUrl, getSubCategoriesUrl, getvendorRequestsUrl } from '../backend/api';
import { getAllHomeSlidersUrl, getSpecialCategoryUrl, GetVendorsItemsUrl } from './../backend/api';

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

  // for specific category 
  getSpecialCategory(id){
    return this.http.get(getSpecialCategoryUrl + id).pipe(map((res:any)=>res.data));
  }

  getBestBrands(id){
    return this.http.get(getBestBrandsUrl + id).pipe(map((res:any)=>res.data));
  }

  getSubCategories(id){
    return this.http.get(getSubCategoriesUrl + id).pipe(map((res:any)=>res.data));
  }

  
  getSubCategoriesOfSubCatetory(id){
    return this.http.get(getSubCategoriesOfSubCategoryUrl + id).pipe(map((res:any)=>res.data));
  }
  
  getCatSliders(id){
    return this.http.get(getCategorySlidersUrl + id).pipe(map((res:any)=>res.data));
  }

  
  getCatSpecialImages(id){
  return this.http.get(getCategorySpecialImagesUrl + id).pipe(map((res:any)=>res.data));
  }

  // vendors
  getVendorRequests(){
    return this.http.get(getvendorRequestsUrl).pipe(map((res:any)=>res.data));

  }

  // items
  getVendorsItems(){
    return this.http.get(GetVendorsItemsUrl).pipe(map((res:any)=>res.data));
  }

  getItems(){
    return this.http.get(GetItemsUrl).pipe(map((res:any)=>res.data));
  }

}
