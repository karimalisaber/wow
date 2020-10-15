import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from './modules/shared/shared.module';
import { ErrorComponentComponent } from './modules/components/error-component/error-component.component';
import { SuccessComponentComponent } from './modules/components/success-component/success-component.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { AddDialogComponent } from './components/dialogs/add-dialog/add-dialog.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { SpecificCategoryComponent } from './components/specific-category/specific-category.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ReviewProductComponent } from './components/review-product/review-product.component';
import { ResizableModule } from 'angular-resizable-element';
import { HttpInterceptorService } from './services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    ErrorComponentComponent,
    SuccessComponentComponent,
    AllCategoriesComponent,
    AddDialogComponent,
    MessagesComponent,
    DeleteDialogComponent,
    SpecificCategoryComponent,
    VendorsComponent,
    LoginComponent,
    AddProductComponent,
    ReviewProductComponent
  ],
  entryComponents:[
    AddDialogComponent,
    MessagesComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResizableModule,
    SharedModule
  ],
  providers: [
    HttpClient, {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService , multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
