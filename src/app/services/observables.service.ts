import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ObservablesService {
  newCategoryAdded$ = new Subject();
  isAdmin$ = new Subject();
  isVendor$ = new Subject();
  constructor() { }
}
