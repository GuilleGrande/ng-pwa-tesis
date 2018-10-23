import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs';
import { Appointment } from '../appointment.model';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  appointments: Observable<Appointment[]>;

  constructor(
    private appointmentService: AppointmentService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(() => this.appointments = this.appointmentService.getAppointments());
    console.log('OnInit Car List component');
    console.log(this.appointments);
  }

}
