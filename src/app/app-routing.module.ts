import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ReviewProductComponent } from './components/review-product/review-product.component';
import { SpecificCategoryComponent } from './components/specific-category/specific-category.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {path:'', component: DashboardComponent, canActivate: [AuthGuardService], children:[
    {path: '', redirectTo: 'allcategories', pathMatch: 'full'},
    {path: 'allcategories' , component: AllCategoriesComponent},
    {path: 'category/:id' , component: SpecificCategoryComponent},
    {path: 'vendors' , component: VendorsComponent},
    {path: 'add-product' , component: AddProductComponent},
    {path: 'review-product' , component: ReviewProductComponent},
  ]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
