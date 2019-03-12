import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs';
import { Appointment } from '../appointment.model';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  private appointmentsCollection: AngularFirestoreCollection<Appointment>;
  appointments: Observable<any[]>;
  user: User;

  constructor(
    private appointmentService: AppointmentService,
    private auth: AuthService
  ) {
    this.auth.user.subscribe((user) => {
      this.user = user;
      console.log('[APPNM-LIST] ' + this.user.uid);

      this.appointments = this.appointmentService.getAppointmentsCollection(this.user.uid);
      /*
      this.appointments = this.appointmentService.getAppointmentsCollection(this.user.uid)
        .subscribe((appointments) => {
          this.appointments = appointments;
          console.log(this.appointments);
        });*/
    });
    // this.getUserAppointments();
  }

  ngOnInit() {
    this.appointmentService.subscribeToUser();
    // this.getUserAppointments();
    console.log(this.appointments);
  }

  /*
  getUserAppointments() {

    this.appointmentService.getAppointmentsCollection(this.user.uid).subscribe();

    this.appointments = this.appointmentService.appointmentsCollection.valueChanges();
  }*/
}
