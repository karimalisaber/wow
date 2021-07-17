import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { ErrorComponentComponent } from './../../modules/components/error-component/error-component.component';
import { AssetsService } from './../../services/assets.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
hide: boolean = true;
dontMatchErr :boolean = false;
isLoading: boolean = false;
isVendor: boolean = false;

colorControl = new FormControl('primary');
  constructor(private api: ApiService, private router : Router, private dialog: MatDialog, private assets: AssetsService) { }

  ngOnInit(): void {
  }

  adminLogin(form){
    this.isLoading = true;
    this.dontMatchErr = false
    this.api.adminLogin(form).subscribe((res:any)=>{
      localStorage.setItem('user', JSON.stringify(res.data));
      this.assets.actionMessage('login successfully')
      this.isVendor = res.data.role == 3 ? true : false;
      if(this.isVendor)
        this.router.navigate(['/home'])
      else 
        this.router.navigate([''])

    },err=>{
      if(err.status===401){
        this.dontMatchErr = true;
        this.isLoading  = false;
        this.dialog.open(ErrorComponentComponent, {
          data:{
            message: "email and Password didn't match" 
          } 
        })
      }
    })
  }
}
