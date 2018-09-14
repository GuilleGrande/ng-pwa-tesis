import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { User } from '../user/user.model';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>
  authState: any = null;

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
    });

    this.afAuth.authState.subscribe(data => this.authState = data);
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.user.uid : null;
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => console.log("You have succesfully signed in"))
      .catch(error => console.log(error.message))
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => { this.updateUserData(userCredential.user) })
      .then(() => console.log("Welcome, your account has been created"))
      .then((userRef) => { this.afAuth.auth.currentUser.sendEmailVerification()
        .then(() => console.log('We sent an email verification'))
        .catch(error => console.log(error.message))
      })
      .catch(error => console.log('Error code : ' + error.code +
        '| Error message: ' + error.message));
  }

  resetPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email)
            .then(() => console.log('We sent you a password reset link'))
            .catch(error => console.log(error.message));
  }

  signOut() {
    return this.afAuth.auth.signOut()
      .then(() => { this.router.navigate(['/']) })
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || null,
      photoUrl: user.photoUrl || "https://www.gravatar.com/avatar/" + Md5.hashStr(user.uid) + "?d=identicon"
    }
    return userRef.set(data, { merge: true });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialLogin(provider);
  }

  private socialLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {
              return this.updateUserData(credential.user)
            })
            .catch((error) => console.log(error.message));
  }

}
