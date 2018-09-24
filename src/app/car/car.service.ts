import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Car } from './car.model';
import { AuthService } from '../core/auth.service';
import { User } from '../user/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  user: User;
  carsCollection: AngularFirestoreCollection<Car>;

  constructor(
    private firebase: AngularFireAuth,
    private db: AngularFirestore,
    private auth: AuthService
  ) {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.user = user;
        this.getCarsCollection(user);
      } else {
        console.log('User not found');
      }
    });
  }

  getCarsCollection(user) {
    this.carsCollection = this.db.collection('users')
          .doc(`${user.uid}`)
          .collection('cars');
  }

  create(data: Car) {
    return this.carsCollection.add(data)
      .then(success => console.log(success))
      .catch(error => console.log(error.message));
  }

  getCars(): Observable<Car[]> {
    return this.carsCollection.snapshotChanges().pipe(
      map( (actions) => actions.map( (a) => {
      const data = a.payload.doc.data() as Car;
      const id = a.payload.doc.id;
      return { id, ...data };
      }))
    );
  }
}
