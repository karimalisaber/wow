import { Component, OnInit } from '@angular/core';
import { ApiGetService } from 'src/app/services/api-get.service';
import { AssetsService } from 'src/app/services/assets.service';
import { UpdateApiService } from 'src/app/services/update-api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  items = [];

  constructor(private apiGet: ApiGetService, private apiUpdate: UpdateApiService, private assets: AssetsService) { }

  ngOnInit(): void {
    this.getItems();
  }

  private getItems(){
    this.apiGet.getItems().subscribe(res=>{
      this.items = res;    
    })
  }
  
  
  changeStatus(status, item_id, message){
    this.apiUpdate.updateItemStatusForVendor({status, item_id}).subscribe(res=>{
      this.assets.actionMessage(message);
      this.getItems();
    })
  }
}
