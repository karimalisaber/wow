import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data , public snackBarRef: MatSnackBarRef<MessagesComponent>) { }

  ngOnInit(): void {
    
  }

}
