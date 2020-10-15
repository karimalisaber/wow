import { Component } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { AssetsService } from './services/assets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'wow';
  constructor(public assets: AssetsService){
  }
}