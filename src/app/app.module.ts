// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// NGX-Bootstrap components
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Firebase modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Application components
import { AppComponent } from './app.component';
import { YmnSheetComponent } from './ymn-sheet/ymn-sheet.component';
import { YmnLibraryComponent } from './ymn-library/ymn-library.component';

// Application services
import { ScoreLibraryService } from './score-library.service';

@NgModule({
  declarations: [
    AppComponent,
    YmnSheetComponent,
    YmnLibraryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyDBjki1FzzfX4vOTQ0G90l3IIn08uV--Wk',
      authDomain: 'ymn-engraver.firebaseapp.com',
      databaseURL: 'https://ymn-engraver.firebaseio.com',
      projectId: 'ymn-engraver',
      storageBucket: 'ymn-engraver.appspot.com',
      messagingSenderId: '638871859233'
    }),
    AngularFirestoreModule
  ],
  providers: [ScoreLibraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
