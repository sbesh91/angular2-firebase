import { 
    Component,
    Input,
    trigger,
    state,
    style,
    transition,
    animate } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'list-add',
  template: `
    <input #item /><button (click)="add(item.value)">Add</button>
  `
})
export class Add {
  items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.items = af.database.list('/items');    
  }
  add(item: string){
      this.items.push({
          name: item,
          state: "void"
      });      
  }  
}