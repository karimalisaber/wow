import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import {  MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatRippleModule} from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';



const SharedImportes = [
  CommonModule,
  MatExpansionModule,
  FormsModule,
  HttpClientModule,
  // ProgressHttpModule,
  MatMenuModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatDialogModule,
  MatRippleModule,
  MatSnackBarModule
  
];

@NgModule({
  declarations: [],
  imports: [
    SharedImportes
  ],
  exports:[
    SharedImportes
  ],
  entryComponents: [
  ],
  providers:[
  {
    provide: MatDialogRef,
    useValue: {}
  }
  ]
})
export class SharedModule { }
