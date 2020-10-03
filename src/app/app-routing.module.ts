import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {path:'', component: DashboardComponent, children:[
    {path: '', redirectTo: 'allcategories', pathMatch: 'full'},
    {path: 'allcategories' , component: AllCategoriesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
