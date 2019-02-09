import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs';
import { Appointment } from '../appointment.model';
import { AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  private appointmentsCollection: AngularFirestoreCollection<Appointment>;
  appointments: Observable<Appointment[]>;

  constructor(
    private appointmentService: AppointmentService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.appointmentService.subscribeToUser();
    this.getUserAppointments();
    console.log(this.appointments);
  }

  getUserAppointments() {
    this.appointments = this.appointmentService.appointmentsCollection.valueChanges();
  }
}
