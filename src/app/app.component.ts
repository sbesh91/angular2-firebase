import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
  <list-add></list-add>
  <div>
      <list-display 
        *ngFor="let item of items | async"
        [item]="item">
      </list-display>
  </div>
  `
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  af: AngularFire;
  constructor(af: AngularFire) {
    this.af = af;    
    this.items = af.database.list('/items');    
  }
}
