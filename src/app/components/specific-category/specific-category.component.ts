import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddDialogComponent } from '../dialogs/add-dialog/add-dialog.component';
import { ApiGetService } from './../../services/api-get.service';
import { AssetsService } from './../../services/assets.service';
import { ApiDeleteService } from './../../services/api-delete.service';

@Component({
  selector: 'app-specific-category',
  templateUrl: './specific-category.component.html',
  styleUrls: ['./specific-category.component.scss']
})
export class SpecificCategoryComponent implements OnInit {
catId;
brands = [];
cat;
subCategories = [];
subCategoriesOfSubCategory = [];
url = 'https://wow.ieeeshasb.org/';
specialImages = [];
sliders = [];
afterSuccesFunction;
isLoading = false;


  constructor(
    private route: ActivatedRoute, 
    private apiget: ApiGetService ,
    private apiDelete: ApiDeleteService, 
    private dialog: MatDialog, 
    private assets: AssetsService) {

    }

  ngOnInit(): void {
    this.getCatIdAndData()
  }

  private getCatIdAndData(){
    this.route.paramMap.subscribe(res=>{      
        this.catId = res.get('id') || null ;

        if(this.catId){
          this.getCatData();
        }
    })
  }

  private getCatData(){
    this.getSpecialCategory();
    this.getBestBrands();
    this.getSubCategories();
    this.getCatSliders();
    this.getCatSpecialImages();
  }

  private getSpecialCategory(){
    this.apiget.getSpecialCategory(this.catId).subscribe(res=>{
      this.cat = res;
    })
  }

  private getBestBrands(){
    this.apiget.getBestBrands(this.catId).subscribe(res=>{
      this.brands = res;
    })
  }

  private getSubCategories(){
    this.apiget.getSubCategories(this.catId).subscribe(res=>{
      this.subCategories = res;
    })
  }

  private getCatSliders(){
    this.apiget.getCatSliders(this.catId).subscribe(res=>{
      this.sliders = res;
    })
  }

  private getCatSpecialImages(){
    console.log('here again ', this.catId);
    
    this.apiget.getCatSpecialImages(this.catId).subscribe(res=>{
      this.specialImages = res;
    })
  }

  add(type){
     this.afterSuccesFunction = null;
    // brand 3
    // subCat 4
    // subCatOfSubCat 5
    // specialImage 6
    // catSlider 7
    this.setAfterSuccessFunctionAction(type);

    this.dialog.open(AddDialogComponent ,{
      data: {type , cat: this.cat},
      panelClass: 'edit-dialog-container',
      width: '30%'
    }).componentInstance.addSuccess.subscribe(res=>{
      if(res){
        this.afterSuccesFunction();
      }
    })
  }

  private setAfterSuccessFunctionAction(type){
    switch(type){
      case 3 : 
        this.afterSuccesFunction = this.getBestBrands;
        break;
      case 4 : 
        this.afterSuccesFunction = this.getSubCategories;
        break;
      case 5 : 
        this.afterSuccesFunction = this.getSubCategoriesOfSubCategoriy;
        break;
      case 6 : 
        this.afterSuccesFunction = this.getCatSpecialImages;
      break;
      case 7 :
        this.afterSuccesFunction = this.getCatSliders;
        break;
    }
  }


  getSubCategoriesOfSubCategoriy(id){    
    this.apiget.getSubCategoriesOfSubCatetory(id).subscribe(res=>{
      this.subCategoriesOfSubCategory = res 
    });
  }

  // delete
  deleteAlert(id , type){
    this.assets.deleteAlert().subscribe(res=>{
      if(!res) return;

      switch(type){
        case 3: 
          this.deleteBestBrand(id); break;
        
        case 4: 
          this.deleteSubCategory(id); break;

        case 5: 
          this.deleteSubCategoryOfSubCategory(id); break;
          
        case 6: 
          this.deleteCatSpecialImage(id); break;
        
        case 7: 
          this.deleteCatSlider(id); break;
        
      }
    })
  }

  private deleteBestBrand(id){
    let index = this.brands.findIndex(res=>res.id ===id);
    let item = index? this.brands[index]: {};
    this.brands.splice(index, 1);
    
    this.apiDelete.deleteBestBrand(id).subscribe(res=>{
      this.assets.actionMessage('Delete Brand Success');
    },error=>{
      this.brands.splice(index, 0, item);
      // error Message
    })
  }

  private deleteSubCategory(id){
    let index = this.subCategories.findIndex(res=>res.id ===id);
    let item = index? this.subCategories[index]: {};
    this.subCategories.splice(index, 1);
    
    this.apiDelete.deleteSubCategory(id).subscribe(res=>{
      this.assets.actionMessage('Delete SubCategory Success');
    },error=>{
      this.subCategories.splice(index, 0, item);
      // error Message
    })
  }

  private deleteSubCategoryOfSubCategory(id){
    let index = this.subCategoriesOfSubCategory.findIndex(res=>res.id ===id);
    let item = index? this.subCategoriesOfSubCategory[index]: {};
    this.subCategoriesOfSubCategory.splice(index, 1);
    
    this.apiDelete.deleteSubCategoryOfSubCategory(id).subscribe(res=>{
      this.assets.actionMessage('Delete SubCategory of SubCategoty Success');
    },error=>{
      this.subCategoriesOfSubCategory.splice(index, 0, item);
      // error Message
    })
  }


  private deleteCatSlider(id){
    let index = this.sliders.findIndex(res=>res.id ===id);
    let item = index? this.sliders[index]: {};
    this.sliders.splice(index, 1);
    
    this.apiDelete.deleteCatSlider(id).subscribe(res=>{
      this.assets.actionMessage('Delete category Slider Success');
    },error=>{
      this.sliders.splice(index, 0, item);
      // error Message
    })
  }

  private deleteCatSpecialImage(id){    
    let index = this.specialImages.findIndex(res=>res.id ===id);
    let item = index? this.specialImages[index]: {};
    this.specialImages.splice(index, 1);
    
    this.apiDelete.deleteCatSpecialImage(id).subscribe(res=>{
      this.assets.actionMessage('Delete Special Image Success');
    },error=>{
      this.specialImages.splice(index, 0, item);
      // error Message
    })
  }


  private setIsLoading(){

  }

  // delete
}
