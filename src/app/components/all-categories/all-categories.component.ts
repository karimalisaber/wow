import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddDialogComponent } from './../dialogs/add-dialog/add-dialog.component';
import { ApiGetService } from './../../services/api-get.service';
import { AssetsService } from './../../services/assets.service';
import { ApiDeleteService } from './../../services/api-delete.service';
import { ObservablesService } from './../../services/observables.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {
categories = [];
sliders = [];
url = 'http://wow.ieeeshasb.org/';

constructor(
    private dialog: MatDialog, 
    private apiGet: ApiGetService, 
    private assets: AssetsService,
    private apiDelete: ApiDeleteService,
    private observe : ObservablesService
    ) { }


   makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }
   

  ngOnInit(): void {
    this.getAllMainCategories();
    this.getAllSliders();
  }

  addMainSlider(){
    this.dialog.open(AddDialogComponent ,{
      data: {type: 2},
      panelClass: 'edit-dialog-container',
      width: '30%'
    }).componentInstance.addSuccess.subscribe(res=>{
      if(res){
        this.getAllSliders();
      }
    })
  }

  addCategory(id = null){
    this.dialog.open(AddDialogComponent ,{
      data: {type: 1, id},
      panelClass: 'edit-dialog-container',
      width: '30%'
    }).componentInstance.addSuccess.subscribe(res=>{
      if(res)
      this.getAllMainCategories();
      this.observe.newCategoryAdded$.next(true)
    })
  }

  private getAllMainCategories(){
    this.apiGet.getMainCategoriesNames().subscribe(res=>{
      this.categories = res;      
    })
  }

  private getAllSliders(){
    this.apiGet.getAllHomeSliders().subscribe(res=>{
      this.sliders = res;      
    })
  }

  deleteAlert(id, type){
    this.assets.deleteAlert().subscribe(res=>{
      if(!res) return;

      switch(type){
        case 'mainCategory': 
          this.deleteMainCategory(id); break;

        case 'mainSlider': 
          this.deleteMainSlider(id); break;  
      }
    })
  }

  private deleteMainCategory(id){
    let index = this.categories.findIndex(res=>res.id ===id);
    let item = index? this.categories[index]: {};
    this.categories.splice(index, 1);
    this.apiDelete.deleteMainCategory(id).subscribe(res=>{
      this.assets.actionMessage('Delete Mani Category Success');
    },error=>{
      this.categories.splice(index, 0, item);
    })
  }

  
  private deleteMainSlider(id){
    let index = this.sliders.findIndex(res=>res.id ===id);
    let item = index? this.sliders[index]: {};
    this.sliders.splice(index, 1);
    this.apiDelete.deleteMainSlider(id).subscribe(res=>{
      this.assets.actionMessage('Delete main Slider Success');
    },error=>{
      this.sliders.splice(index, 0, item);
      // error Message
    })
  }
  
  @HostListener('window:scroll', ['$event']) 
    dotheJob(event) {
      console.debug("Scroll Event", window.pageYOffset );
  }


  
}
