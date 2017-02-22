import {Component} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'list-display',
  template: `
  <ul>
    <li *ngFor="let item of items | async">
      {{ item.name }}
      <button (click)="delete(item)">X</button>
    </li>
  </ul>
  `
})
export class List {
  items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.items = af.database.list('/items');
  }
  delete(item: Object){
    console.log(item);
  }
}