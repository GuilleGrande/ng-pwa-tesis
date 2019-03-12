import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Appointment } from './appointment.model';
import { AuthService } from '../core/auth.service';
import { User } from '../user/user.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  user: User;
  appointmentsCollection: AngularFirestoreCollection<Appointment>;
  allAppointments: Observable<Appointment[]>;

  constructor(
    private db: AngularFirestore,
    private auth: AuthService
  ) {
    this.auth.user.subscribe(user => {
      this.user = user;
    });
    this.subscribeToUser();
  }

  subscribeToUser() {
    return this.auth.user.subscribe((user) => {
      if (user) {
        this.user = user;
        console.log('[Appn Service][Sub to user] ' + user.uid);
        this.gimmieAppointmentsCollection(user.uid);
      } else {
        console.log('User not found');
      }
    });
  }

  getAllAppointments() {
    return this.db.collection('appointments',
      (ref) => {
        const query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query.where('status', '==', 'Scheduled');
        return query;
      }).valueChanges();
  }

  getAppointmentsCollection(userId: string) {
    console.log('From get appointmentsCollection');
    return this.db.collection('appointments',
      (ref) => ref.where('clientId', '==', userId)).valueChanges();
  }

  gimmieAppointmentsCollection(userId: string) {
    this.appointmentsCollection = this.db.collection('appointments',
      (ref) => ref.where('clientId', '==', userId));
  }

  create(data: Appointment) {
    try {
      const success = this.appointmentsCollection.add(data);
      return console.log(success);
    } catch (error) {
      return console.log(error.message);
    }
  }

  getAppointments(): Observable<Appointment[]> {
    return this.appointmentsCollection.snapshotChanges().pipe(
      map( (actions) => actions.map( (a) => {
      const data = a.payload.doc.data() as Appointment;
      const id = a.payload.doc.id;
      console.log('From getAppointments');
      console.log(data);
      return { id, ...data };
      }))
    );
  }
}
