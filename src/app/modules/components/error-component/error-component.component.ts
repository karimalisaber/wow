import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-component',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.scss']
})
export class ErrorComponentComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data, 

  ) { }

  ngOnInit(): void {
    document.getElementById('message').innerHTML = this.data.message
  }

}
