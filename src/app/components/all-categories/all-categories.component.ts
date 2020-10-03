import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddDialogComponent } from './../dialogs/add-dialog/add-dialog.component';
import { ApiGetService } from './../../services/api-get.service';
import { AssetsService } from './../../services/assets.service';
import { ApiDeleteService } from './../../services/api-delete.service';

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
    private dialogRef: MatDialogRef<AddDialogComponent>,
    private assets: AssetsService,
    private apiDelete: ApiDeleteService
    ) { }

  ngOnInit(): void {
    this.getAllMainCategories();
    this.getAllSliders();

  }

  addMainSlider(){
    this.dialog.open(AddDialogComponent ,{
      data: {type: 2},
      panelClass: 'edit-dialog-container',
      width: '30%'
    }).componentInstance.addMainCatSuccess.subscribe(res=>{
      if(res)
      this.getAllSliders();
      
    })
  }

  addCategory(id = null){
    this.dialog.open(AddDialogComponent ,{
      data: {type: 1, id},
      panelClass: 'edit-dialog-container',
      width: '30%'
    }).componentInstance.addMainCatSuccess.subscribe(res=>{
      if(res)
      this.getAllMainCategories();
      
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
      // error Message
    })
  }

  

}
