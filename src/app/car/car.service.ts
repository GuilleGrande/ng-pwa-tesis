import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Car } from './car.model';
import { AuthService } from '../core/auth.service';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  user: User;
  carsCollection: AngularFirestoreCollection<Car>

  constructor(
    private db: AngularFirestore,
    private auth: AuthService
  ) { 
    this.user = this.auth.authState
    this.carsCollection = this.db.collection(`users/${this.user.uid}/cars`);
  }

  create(data: Car) {
    return this.carsCollection.add(data)
      .then(success => console.log(success))
      .catch(error => console.log(error.message));
  }
}
