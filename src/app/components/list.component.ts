import {
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'list-display',
  styleUrls: ['./list.component.css'],
  template: `
    <div class="item" [@dataState]="item.state">
      <div class="header">
        <span>{{ item.name }}</span>
        <span><button class="btn" (click)="delete(item)">X</button></span>        
      </div>      
    </div>  
  `,
  animations:[
    trigger('dataState', [
      state('void', style({        
        transform: 'scale(.5) translate(0, -100px)',
        opacity: 0
      })),
      state('active', style({
        transform: 'scale(1)'
      })),
      state('remove', style({
        transform: 'scale(.5) translate(0, -100px)',
        opacity: 0
      })),
      state('full', style({
        transform: 'scale(1)'
      })), 
      transition('void => active', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', keyframes([
          style({transform: 'scale(.5) translate(0, -100px)', opacity: 0, offset: 0}),
          style({transform: 'none', opacity: 1, offset: 1.0})
        ]))
      ]),
      transition('active => remove', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', keyframes([
          style({transform: 'none', opacity: 1, offset: 0}),
          style({transform: 'scale(.5) translate(0, -100px)', opacity: 0, offset: 1.0})
        ]))
      ]),
      transition('active => full', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', keyframes([
          style({transform: 'scale(.5) translate(0, -100px)', offset: 0}),
          style({transform: 'none', offset: 1.0})
        ]))
      ]),
      transition('full => active', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', keyframes([
          style({transform: 'scale(.5) translate(0, -100px)', offset: 0}),
          style({transform: 'none', offset: 1.0})
        ])),        
      ]),
    ])
  ]
})
export class List {
  @Input()
  item: Object;  
  dbItem: FirebaseObjectObservable<any>;
  af: AngularFire;

  constructor(af: AngularFire) {
    this.af = af;    
  }

  ngOnInit(){
    this.dbItem = this.af.database.object(`/items/${this.item["$key"]}`);    
    if(this.item["state"] === "void"){
      this.dbItem.update({ state: "active" })
    }
  }

  delete(item: Object){    
    this.dbItem.update({ state: "remove" })
    setTimeout(function() {
      this.dbItem.remove();
    }, 300);
  }
}