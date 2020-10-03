import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesComponent } from './../components/messages/messages.component';
import { DeleteDialogComponent } from './../components/dialogs/delete-dialog/delete-dialog.component';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private snack: MatSnackBar, private dialog: MatDialog) { }

  actionMessage(message){
    return this.snack.openFromComponent(MessagesComponent, {duration: 2000, panelClass: 'background-none', horizontalPosition: 'left', verticalPosition: 'top', data: message});
  }

    
  deleteAlert() {
    return  this.dialog.open(DeleteDialogComponent)
      .afterClosed().pipe(map(res=>{
        if(res === "yes") return true;
  
        return false;
      }),take(1));
  }


}
