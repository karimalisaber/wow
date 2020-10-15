import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { ApiGetService } from './../../services/api-get.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  navOpened = true;
  categories;
  activCatId: number= null;
  @Input('expandNav') expandNav;

  constructor(private apiGet: ApiGetService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAllMainCategories()
    this.getActiveLink()
    
  }

  private getActiveLink(){
    this.route.firstChild.paramMap.subscribe(res=>{
      if(res.get('id'))
      this.activCatId = +res.get('id')
    })
   
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
