import { Component, OnInit } from '@angular/core';
import { ApiGetService } from './../../services/api-get.service';
import { map } from 'rxjs/operators';
import { ApiService } from './../../services/api.service';
import { AssetsService } from './../../services/assets.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
categories;
subCategories;
subOfSubCategories;
selectedCatId;
selectedSubCatId;
selectedSubOfSubCatId;

isLoading: boolean = false;

imageFile:  Array<any> = []; // for uploaded image
imagesUrls = [];

onChangeCat: boolean = false;
onChangeSubCat: boolean = false;

backEndForm= new FormData();

  constructor(private apiget: ApiGetService, private apiPost: ApiService, private assets: AssetsService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.onChangeCat = true;
    this.apiget.getMainCategoriesNames()
      .subscribe(res=>{
        this.onChangeCat = false;
        this.categories = res; 
      });
  }

  getSubCategories(){
    this.onChangeSubCat = true;
    this.apiget.getSubCategories(this.selectedCatId).subscribe(
      res=>{        
        this.subCategories = res;
        this.onChangeSubCat = false;
      }
    )
  }

  getSubOfSubCategory(){    
    this.apiget.getSubCategoriesOfSubCatetory(this.selectedSubCatId).subscribe(res=>{
      this.subOfSubCategories = res      
    })
  }

  changeCategory(id){
    this.subOfSubCategories = []; // for clean up last one
    this.subCategories = []; // for clean up categories
    this.selectedCatId = id;
    this.getSubCategories();
  }

  changeSubCategory(id){
    this.subOfSubCategories = []; // for clean up last one

    this.selectedSubCatId = id;    
    this.getSubOfSubCategory();
  }

  add(type){

  }
  
  delete(index){
    this.imageFile = this.imageFile.filter((res, i)=> index !==i)
    this.imagesUrls = this.imagesUrls.filter((res, i)=>index !==i)
  }

  uploadImages(event){
    console.log(event.target.value);
    
    if(event.target.files){
      this.imageFile = this.imageFile.length? this.imageFile.concat(Array.from( event.target.files)) :Array.from( event.target.files);

      for(let i = 0 ; i< this.imageFile.length; i++){
        this.imagesUrls = []
        var render = new FileReader();
        render.readAsDataURL(this.imageFile[i]);
        render.onload = (e: any) =>  this.imagesUrls.push({url: e.target.result , name :this.imageFile[i].name}) ;
      }
    }
  }

  clearProductsImages(){
    this.imagesUrls = []
    this.imageFile = []
  }

  addProduct(form){
    if(this.isLoading) return;
    this.isLoading = true;
    this.clearProductsImages()
    this.assets.loading$.next(true)


    form.express = form.express? 1 : 0;

    for(let prop in form){
      this.backEndForm.append(prop, form[prop])
    }

    this.imageFile.forEach(res=>{
      this.backEndForm.append('images[]', res)
    })

    // map express
    this.apiPost.addItem(this.backEndForm).subscribe(res=>{
      this.isLoading = false;
      this.assets.actionMessage('Product Added Successfully');
      this.assets.loading$.next(false)

    },error=>{
      this.isLoading = false;
      this.assets.actionMessage('error, try again');
      this.assets.loading$.next(false)

    })
  }
}
