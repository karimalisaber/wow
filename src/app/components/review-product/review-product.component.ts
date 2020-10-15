import { Component, OnInit } from '@angular/core';
import { ApiGetService } from './../../services/api-get.service';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.scss']
})
export class ReviewProductComponent implements OnInit {
items = [];
  constructor(private apiGet: ApiGetService) { }

  ngOnInit(): void {
    this.getItems();
  }

  private getItems(){
    this.apiGet.getVendorsItems().subscribe(res=>{
      this.items = res;
    })
  }

  changeStatus(status, id , message){

  }
}
