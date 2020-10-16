import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { ApiGetService } from './../../services/api-get.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ObservablesService } from './../../services/observables.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  navOpened = true;
  categories;
  activCatId: number= null;
  isAdmin: boolean = false;
  isVendor: boolean = false;
  
  @Input('expandNav') expandNav;

  

  constructor(private apiGet: ApiGetService, private route: ActivatedRoute, private router: Router , public observe: ObservablesService) { 
   
  }

  ngOnInit(): void {
    this.getAllMainCategories()
    this.getActiveLink()
    this.observe.newCategoryAdded$.subscribe(res=>{
      if(res){
        this.getAllMainCategories()
      }
    });
    let user = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null;

    
    if(user.role){
      this.isAdmin = (user.role == 1)? true : false 
      
      this.isVendor = (user.role == 3)? true : false 
    }
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
