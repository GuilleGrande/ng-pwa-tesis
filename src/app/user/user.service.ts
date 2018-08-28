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

  constructor(private db: AngularFirestore) { }

  getUsers() {
    this.userCollection = this.db.collection('users');
    return this.userCollection.valueChanges();
  }
}
