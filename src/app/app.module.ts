import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';

const firebaseConfig = {
  apiKey: "AIzaSyCnQbgNXDJT6sy1_f8gx3d74kM-3FY2uCw",
  authDomain: "pubkin-6efd2.firebaseapp.com",
  projectId: "pubkin-6efd2",
  storageBucket: "pubkin-6efd2.appspot.com",
  messagingSenderId: "1019249625237",
  appId: "1:1019249625237:web:73473b4f492538851a739c"
};

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    SigninComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  FormsModule,AngularFireModule.initializeApp(firebaseConfig),
  AngularFirestoreModule,MatCardModule
  
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
