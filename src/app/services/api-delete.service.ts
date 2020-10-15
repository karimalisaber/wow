import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { deleteBestBrandUrl, deleteCatSliderUrl, deleteCatSpecialImageUrl, deleteMainCategoryUrl, deleteMainSliderUrl, deleteSubCategoryOfSubCategoryUrl, deleteSubCategoryUrl } from './../backend/api';

@Injectable({
  providedIn: 'root'
})
export class ApiDeleteService {

  constructor(private http: HttpClient) { }

  deleteMainCategory(id){
    return this.http.delete(deleteMainCategoryUrl+id)
  }

  
  deleteMainSlider(id){
    return this.http.delete(deleteMainSliderUrl+id)
  }

  // special category
   deleteBestBrand(id){
    return this.http.delete(deleteBestBrandUrl + id)
  }

   deleteSubCategory(id){
    return this.http.delete(deleteSubCategoryUrl + id)
  }

   deleteSubCategoryOfSubCategory(id){
    return this.http.delete(deleteSubCategoryOfSubCategoryUrl +id)
  }


   deleteCatSlider(id){
    return this.http.delete(deleteCatSliderUrl + id)
  }

   deleteCatSpecialImage(id){    
    return this.http.delete(deleteCatSpecialImageUrl + id)
  }

}
