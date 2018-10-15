import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { CarServiceModel } from './car-service.model';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  carServiceCollection: AngularFirestoreCollection<any>;
  carServiceDocument: AngularFirestoreDocument<any>;

  constructor(
    private db: AngularFirestore,
    ) { }

  getCarServices(): Observable<CarServiceModel[]> {
    this.carServiceCollection = this.db.collection('car-service');
    return this.carServiceCollection.valueChanges();
  }

  getCarService(name: string) {
    this.carServiceDocument = this.db.doc(`car-service/${name}`);
    return this.carServiceDocument.valueChanges();
  }
}
