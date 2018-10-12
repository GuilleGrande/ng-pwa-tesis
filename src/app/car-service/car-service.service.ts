import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { CarService } from './car-service.model';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  carServiceCollection: AngularFirestoreCollection<any>;
  carServiceDocument: AngularFirestoreDocument<any>;

  constructor(private db: AngularFirestore) { }

  getCarServices() {
    this.carServiceCollection = this.db.collection('car-service');
    return this.carServiceCollection.valueChanges();
  }

  getCarService(name: string) {
    this.carServiceDocument = this.db.doc(`car-service/${name}`);
    return this.carServiceDocument.valueChanges();
  }
}
