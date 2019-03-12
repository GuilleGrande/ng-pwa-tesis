import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/user.model';
import { AuthService } from 'src/app/core/auth.service';
import { Observable } from 'rxjs';
import { AppointmentService } from '../../appointment.service';
import { Appointment } from '../../appointment.model';

@Component({
  selector: 'app-admin-appointment-list-item',
  templateUrl: './admin-appointment-list-item.component.html',
  styleUrls: ['./admin-appointment-list-item.component.css']
})
export class AdminAppointmentListItemComponent implements OnInit {

  today = Date.now();
  user: User;
  appointments: any[];

  constructor(private auth: AuthService, private appointmentService: AppointmentService) {
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
    this.getTodayAppointments();
  }

  ngOnInit() {
    this.getTodayAppointments();
  }

  getTodayAppointments() {
      this.appointmentService.getAllAppointments().subscribe((appointments) => {
        this.appointments = appointments;
      });
    }
}
