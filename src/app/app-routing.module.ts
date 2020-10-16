import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ReviewProductComponent } from './components/review-product/review-product.component';
import { SpecificCategoryComponent } from './components/specific-category/specific-category.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { VendorAuthGuardService } from './services/vendor-auth-guard.service';


const routes: Routes = [
  {path:'', component: DashboardComponent, canActivate: [AuthGuardService, AdminAuthGuardService], children:[
    {path: '', redirectTo: 'allcategories', pathMatch: 'full' } ,
    {path: 'allcategories' , component: AllCategoriesComponent },
    {path: 'category/:id' , component: SpecificCategoryComponent},
    {path: 'review-products' , component: ReviewProductComponent},
    {path: 'vendors' , component: VendorsComponent},

  ]},

  {path:'home', component: DashboardComponent, canActivate: [AuthGuardService, VendorAuthGuardService], children:[
    {path: '', redirectTo: 'add-product', pathMatch: 'full' } ,
    {path: 'add-product' , component: AddProductComponent},
    {path: 'view-products' , component: ViewProductComponent},
  ]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
