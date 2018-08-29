import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './user.model';
import { AuthService } from '../core/auth.service';
import { log } from 'util';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;

  constructor(private db: AngularFirestore, private auth: AuthService) { }

  getUsers() {
    this.userCollection = this.db.collection('users');
    return this.userCollection.valueChanges();
  }

  getUser(userId: string) {
    this.userDoc = this.db.doc<User>(`users/${ userId }`);
    return this.userDoc.valueChanges();
  }

  updateProfileData(displayName: string, photoUrl: string) {
    const user = this.auth.authState;
    const data = { displayName, photoUrl };
    
    return user.updateProfile(data)
            .then(() => this.db.doc(`users/${user.uid}`).update({ displayName, photoUrl }))
            .then(() => console.log('Your profile has been updated'))
            .catch((error) => console.log(error.message));
  }

  updateEmailData(email: string) {
    const user = this.auth.authState;
    
    return user.updateEmail(email)
            .then(() => this.db.doc(`users/${user.uid}`).update({ email }))
            .then(() => console.log('Your email has been updated to ' + email))
            .then((user) => this.auth.authState.sendEmailVerification()
              .then(() => console.log('We sent you a verification email.'))
              .catch((error) => console.log(error.message))
              )
            .catch((error) => console.log(error.message));



  }
}
