import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { Add } from './components/add.component';
import { List } from './components/list.component';

@NgModule({
  declarations: [
    AppComponent,
    Add,
    List
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDAgMhwpxJjSaGSXZPzEBW6euqKraemOOs",
      authDomain: "angular2-eb17c.firebaseapp.com",
      databaseURL: "https://angular2-eb17c.firebaseio.com",
      storageBucket: "angular2-eb17c.appspot.com",
      messagingSenderId: "765190242682"
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
