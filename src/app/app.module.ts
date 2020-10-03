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
    DeleteDialogComponent
  ],
  entryComponents:[
    AddDialogComponent,
    MessagesComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
