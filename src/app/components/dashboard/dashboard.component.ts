import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // @Output('expandNav') expandNav: EventEmitter<boolean> =   new EventEmitter();
  expandNav= true;

  constructor() { }

  ngOnInit(): void {
  }

  sidenavToggle(){
  this.expandNav = !this.expandNav;  
  }

  
  logOut(){
    localStorage.clear();
    location.reload();
  }

}
