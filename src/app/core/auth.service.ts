import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { error } from 'util';
import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';


interface User {
  uid: string,
  email: string,
  //firstName: string,
  //lastName: string,
  displayName?: string,
  photoUrl?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>

  constructor(private afAuth: AngularFireAuth,
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

  emailSignUp(email: string, password: string) {
    console.log('From emailSignUp() Email: ' + email);
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((userRef) => { this.updateUserData(userRef) })
      .then(() => console.log("Welcome, your account has been created"))
      .catch(error => console.log('Error code : ' + error.code +
        '| Error message: ' + error.message));
  }

  signOut() {
    return this.afAuth.auth.signOut()
      .then(() => { this.router.navigate(['/']) })
  }

  private updateUserData(users) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${users.user.uid}`);
    const data: User = {
      uid: users.user.uid,
      email: users.user.email || null,
      //firstName: user.firstName,
      //lastName: user.lastName,
      displayName: users.user.displayName,
      photoUrl: "https://www.gravatar.com/avatar/" + Md5.hashStr(users.user.uid) + "?d=identicon"
    }
    return userRef.set(data, { merge: true });
  }

}
