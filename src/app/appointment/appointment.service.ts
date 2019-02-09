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

  constructor(
    private db: AngularFirestore,
    private auth: AuthService
  ) {
    this.subscribeToUser();
  }

  subscribeToUser() {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.user = user;
        console.log('[Appn Service][Sub to user] ' + user.uid);
        this.getAppointmentsCollection(user.uid);
      } else {
        console.log('User not found');
      }
    });
  }

  getAppointmentsCollection(userId) {
    console.log('From get appointmentsCollection');
    this.appointmentsCollection = this.db.collection('appointments',
      (ref) => ref.where('userId', '==', userId));
  }

  create(data: Appointment) {
    return this.appointmentsCollection.add(data)
      .then(success => console.log(success))
      .catch(error => console.log(error.message));
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
