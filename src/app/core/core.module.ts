import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from './auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AuthModule,
    BrowserAnimationsModule
  ],
  declarations: [],
  providers: [ AuthService ]
})
export class CoreModule { }
