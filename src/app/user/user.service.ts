import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './user.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;

  constructor(private db: AngularFirestore) { }

  getUsers() {
    this.userCollection = this.db.collection('users');
    return this.userCollection.valueChanges();
  }

  getUser(userId: string) {
    this.userDoc = this.db.doc<User>(`users/${ userId }`);
    return this.userDoc.valueChanges();
  }
}
