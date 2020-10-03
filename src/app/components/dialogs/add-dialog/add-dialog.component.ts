import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetsService } from './../../../services/assets.service';
import { ApiService } from './../../../services/api.service';
import { UpdateApiService } from './../../../services/update-api.service';


interface Form{
  id: number | null,
  image: string,
  name: string,
 
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
  title;
  imageFile: any = null; // for uploaded image
  imgName;
  action;
  actionFunction :Function ;
  isLoading: boolean = false;

  @Output('addSucess') addMainCatSuccess: EventEmitter<boolean> = new EventEmitter()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data, 
    private assets: AssetsService, 
    private api: ApiService, 
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

    if(this.itemId){
      this.imgExsist = true;
      this.getSpecificItemData();
    }

    this.action = this.itemId? 'Edit' : 'Add';
    switch(this.type){
      case 1 :
        this.title = 'Add Group';
        this.imgName = 'Add image for this Group'        
        this.actionFunction = this.addMainCategory;
        break;      
    }
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

  
  // add items
  private addMainCategory(){    
    this.backForm.append('name' , this.form.name);
    this.backForm.append('image' , this.imageFile);
    
    this.api.addMainCategory(this.backForm).subscribe(
      res=>{
        this.addMainCatSuccess.emit(true);
        this.dialogRef.close();
        this.assets.actionMessage('Group Added Successfully');
      }
    )
  }

  private edit(){
    this.backForm.append('name' , this.form.name);

    if(this.imageFile)
    this.backForm.append('image' , this.imageFile);
    
    this.updateApi.updateMainCategory(this.itemId, this.backForm).subscribe(
      res=>{
        this.addMainCatSuccess.emit(true);
        this.dialogRef.close();
        this.assets.actionMessage('Group Added Successfully');
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
      this.imgName = imgValue.files[0].name;
      this.imageFile = imgValue.files[0];
      this.imgExsist = true;
    }else{
      this.imgExsist = false;
    }
  }

}


/*
1- add Group

*/ 
