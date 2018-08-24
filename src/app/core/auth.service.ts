import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { error } from 'util';

interface User {
  uid: string,
  email: string,
  firstName: string,
  lastName: string,
  fullName?: string,
  photoUrl?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>

  constructor( 
    private afAuth: AngularFireAuth, 
    private db: AngularFirestore, 
    private router: Router) { 
      
      this.user = this.afAuth.authState.switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else {
          return of(null);
        }
      })
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(() => console.log("You have succesfully signed in"))
            .catch(error => console.log(error.message))
  }

  signOut() {
    return this.afAuth.auth.signOut()
            .then(() => { this.router.navigate(['/'])})
  }

}
