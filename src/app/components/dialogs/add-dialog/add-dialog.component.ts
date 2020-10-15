import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetsService } from './../../../services/assets.service';
import { ApiService } from './../../../services/api.service';
import { UpdateApiService } from './../../../services/update-api.service';
import { ApiGetService } from './../../../services/api-get.service';


interface Form{
  id: number | null,
  image: string,
  name?: string,
  link?: ''
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  type;
  form : Form = this.initForm();
  backForm: FormData = new FormData();
  imgExsist: boolean = false;
  itemId // if id exist mean add ;
  specialCategoryId; // if it is and Special Category

  UIElements= {
    title:'',
    imgName:'',
    specialCatName: '',
    name: 'Name'
  }
  
  
  imageFile: any = null; // for uploaded image
  subCategoryId;
  action;
  actionFunction :Function ;
  isLoading: boolean = false;

  subCategories; // for type 5

  @Output('addSucess') addSuccess: EventEmitter<boolean> = new EventEmitter()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data, 
    private assets: AssetsService, 
    private api: ApiService, 
    private apiGet: ApiGetService,
    private dialogRef: MatDialogRef<AddDialogComponent>,
    private updateApi: UpdateApiService
    ) { }

  ngOnInit(): void {
    this.setUi();
  }

  private initForm(): Form{
    return {
      id: null,
      image: null,
      name: null
    
    }
  }

  private setUi(){
    this.type = this.data.type;
    this.itemId = this.data.id || null ;
    this.UIElements.specialCatName = (this.data && this.data.name)? this.data.cat.name : 'null';

    if( this.data.cat){
      this.specialCategoryId = this.data.cat.id || 'null'
    }

    if(this.itemId){
      this.imgExsist = true;
      this.getSpecificItemData();
    }

    this.action = this.itemId? 'Edit' : 'Add';
    
    switch(this.type){
      case 1 :
        this.UIElements.title = 'Add Group';
        this.UIElements.imgName = 'Add image for this Group'        
        this.actionFunction = this.addMainCategory;
      break;
      
      case 2 : 
        this.UIElements.title = 'Add Home Slider';
        this.UIElements.imgName = 'Add Slider Img';

        this.actionFunction = this.addMainSlider;
      break;
      // case 3 :
      // case 4 :
      // case 5 :
      // case 6 :
      // case 7 :

      case 3 : 
        this.UIElements.title = `Add Brand For ${this.UIElements.specialCatName} Category`;
        this.UIElements.imgName = 'Brand Image';
        this.UIElements.name = 'Brand Name';
        this.backForm.append('category_id', this.specialCategoryId)

        this.actionFunction = this.addBestBrand;
      break;

      
      case 4 : 
      this.UIElements.title = `Add SubCategory For ${this.UIElements.specialCatName} Category`;
      this.UIElements.imgName = 'subCategory Image';
      this.UIElements.name = 'SubCategory Name';
      this.backForm.append('category_id', this.specialCategoryId)

      this.actionFunction = this.addSubCategory;
      break;

        
      case 5 :  //subCatOfSubCat
      this.UIElements.title = `Add SubCategory of SubCategory For ${this.UIElements.specialCatName} Category`;
      this.UIElements.imgName = 'subCategory of SubCategory Image';
      this.UIElements.name = 'SubCategory of SubCategory Name';
      this.backForm.append('category_id', this.specialCategoryId)
      this.getSubCat(this.specialCategoryId); 
        this.actionFunction = this.addSubCategoryOfSubCategory;
      break;

      
      case 6 : 
      this.UIElements.title = `Add Special Image For ${this.UIElements.specialCatName} Category`;
      this.UIElements.imgName = 'Special Image';
      // this.UIElements.name = 'Special Name';
      this.backForm.append('category_id', this.specialCategoryId)

        this.actionFunction = this.addCatSpecialImage;
      break;

        
      case 7 :       
      this.UIElements.title = `Add Slider For ${this.UIElements.specialCatName} Category`;
      this.UIElements.imgName = 'Slider Image';
      this.backForm.append('category_id', this.specialCategoryId)

      this.actionFunction = this.addCatSlider;
      break;
    }    
  }


  getSubCat(id){
    this.apiGet.getSubCategories(id).subscribe(res=>{
      this.subCategories = res;
    })
    
  }

  takeAction(form){
    this.isLoading = true;
    this.form = form;
    
    if(!this.itemId){   
      this.actionFunction();
      return
    }

    this.edit()
  }

  // for special image
  
  private addBestBrand(){
    this.backForm.append('name' , this.form.name);
    this.backForm.append('image' , this.imageFile);

    this.api.addCategoryBrand(this.backForm).subscribe(res=>{
      this.SuccessClose('Brand Added SuccessFully')
    })
  }

  private addSubCategory(){
    this.backForm.append('name' , this.form.name);
    this.backForm.append('image' , this.imageFile);

    this.api.addSubCategory(this.backForm).subscribe(res=>{
      this.SuccessClose('Sub Category Added SuccessFully')
    })
  }

  private addCatSlider(){
    this.backForm.append('link' , this.form.link);
    this.backForm.append('image' , this.imageFile);
    
    this.api.addCategorySlider(this.backForm).subscribe(res=>{
      this.SuccessClose('Slider Added Successfully');
    })
  }

  
  private addCatSpecialImage(){
    this.backForm.append('image' , this.imageFile);
    this.api.addCategorySpecialImage(this.backForm).subscribe(res=>{
      this.SuccessClose('Special Image Added SuccessFully')
    })
  }

  private addSubCategoryOfSubCategory(){
    this.backForm.append('name', this.form.name);
    this.backForm.append('sub_category_id', this.subCategoryId);
    this.backForm.append('image' , this.imageFile);
    
    this.api.addSubOfSubCategory(this.backForm).subscribe(res=>{
      this.SuccessClose('Added Successfully');      
    })
  }
  // add items
  private addMainCategory(){    
    this.backForm.append('name' , this.form.name);
    this.backForm.append('image' , this.imageFile);
    
    this.api.addMainCategory(this.backForm).subscribe(
      res=>{
       this.SuccessClose('Group Added Successfully');
      }
    )
  }

  private addMainSlider(){    
    this.backForm.append('link' , this.form.link);
    this.backForm.append('image' , this.imageFile);
    
    this.api.addMainSlider(this.backForm).subscribe(
      res=>{
        this.SuccessClose('Main Slider Added Successfully');
      }
    )
  }

  private edit(){
    this.backForm.append('name' , this.form.name);

    if(this.imageFile)
    this.backForm.append('image' , this.imageFile);
    
    this.updateApi.updateMainCategory(this.itemId, this.backForm).subscribe(
      res=>{
        this.SuccessClose('Group edited Successfully');
      }
    )
  }

  private getSpecificItemData(){
    this.api.getSpecificMainCategory(this.itemId).subscribe(res=>{
      this.form.name = res.name
      
    })
  }

  imgUpload(imgValue){
    if( imgValue && imgValue.files[0]) {
      this.UIElements.imgName = imgValue.files[0].name;
      this.imageFile = imgValue.files[0];
      this.imgExsist = true;
    }else{
      this.imgExsist = false;
    }
  }

  private SuccessClose(message){
    this.addSuccess.emit(true);
    this.dialogRef.close();
    this.assets.actionMessage(message);
  }

}


/*
1- add Group (main category)
2- add main slider 
3- brand 3
4- subCat 4

6- specialImage 6
7- catSlider 7
    
*/ 
