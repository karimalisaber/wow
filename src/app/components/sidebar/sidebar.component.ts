import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { ApiGetService } from './../../services/api-get.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  navOpened = true;
  categories;
  @Input('expandNav') expandNav;

  constructor(private apiGet: ApiGetService) { }

  ngOnInit(): void {
    this.getAllMainCategories()
  }

  
  private getAllMainCategories(){
    this.apiGet.getMainCategoriesNames().subscribe(res=>{
      this.categories = res;      
    })
  }


  sidenavToggle(){
    
    this.navOpened = !this.navOpened;
  }
}
