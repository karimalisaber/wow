import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {addBestBrandUrl, addCategorySliderUrl, addCategorySpecialImageUrl, addItemUrl, addMainCategoryUrl, addMainSliderUrl, addSubCategoryOfSubCategory, addSubCategoryUrl, getSpecificMainCategoryNamesUrl} from 'src/app/backend/api';
import { map } from 'rxjs/operators';
import { adminLoginUrl } from './../backend/api';

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

  addMainSlider(Form){
    Form.append('lang' , this.lang);
    return this.http.post(addMainSliderUrl, Form);
  }


    // special category
    addCategorySlider(Form){
      Form.append('lang' , this.lang);

      return this.http.post(addCategorySliderUrl, Form);
    }
  
    addCategoryBrand(Form){
      Form.append('lang' , this.lang);

      return this.http.post(addBestBrandUrl, Form);
    }
  
    addSubCategory(Form){
      Form.append('lang' , this.lang);

      return this.http.post(addSubCategoryUrl, Form);
    }
  
    addCategorySpecialImage(Form){
      return this.http.post(addCategorySpecialImageUrl, Form);
    }
  
    addSubOfSubCategory(Form){
      Form.append('lang' , this.lang);

      return this.http.post(addSubCategoryOfSubCategory, Form);
    }
    
    // items
    addItem(Form){
      Form.append('lang' , this.lang);
      return this.http.post(addItemUrl, Form);
    }

    // auth 
    adminLogin(form){
      return this.http.post(adminLoginUrl, form)
    }

  getSpecificMainCategory(id){
    return this.http.get(getSpecificMainCategoryNamesUrl +id).pipe(map((res:any)=>res.data))
  }

}
