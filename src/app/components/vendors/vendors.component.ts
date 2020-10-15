import { Component, OnInit } from '@angular/core';
import { ApiGetService } from './../../services/api-get.service';
import { UpdateApiService } from './../../services/update-api.service';
import { AssetsService } from './../../services/assets.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  isLoading = false;
  vendors = [];

  constructor(private getApi: ApiGetService, private updateApi: UpdateApiService, private assets: AssetsService) { }

  ngOnInit(): void {
    this.getVendorRequests();
  }

  private getVendorRequests(){
    this.getApi.getVendorRequests().subscribe(res=>{
      this.vendors = res;   
    })
  }

  changeStatus(status, user_id, message){
    this.updateApi.updateVendorStatus({user_id, status}).subscribe(res=>{
      this.assets.actionMessage(message);
      this.getVendorRequests();
      
    })
  } 

}
