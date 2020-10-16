import { Component, OnInit } from '@angular/core';
import { ApiGetService } from './../../services/api-get.service';
import { UpdateApiService } from './../../services/update-api.service';
import { AssetsService } from './../../services/assets.service';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.scss']
})
export class ReviewProductComponent implements OnInit {
items = [];

  constructor(private apiGet: ApiGetService, private apiUpdate: UpdateApiService, private assets: AssetsService) { }

  ngOnInit(): void {
    this.getItems();
  }

  private getItems(){
    this.apiGet.getVendorsItems().subscribe(res=>{
      this.items = res;    
    })
  }

  
  changeStatus(status, item_id, message){
    this.apiUpdate.updateItemStatus({status, item_id}).subscribe(res=>{
      this.assets.actionMessage(message);
      this.getItems();
    })
  }
}
