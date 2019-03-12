import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { SharedModule } from '../shared/shared.module';
import { NewAppointmentDialogComponent } from './new-appointment-dialog/new-appointment-dialog.component';
import { Routes, RouterModule } from '@angular/router';
import { CarService } from '../car/car.service';
import { CarServiceService } from '../car-service/car-service.service';
import { AppointmentService } from './appointment.service';
import { AppointmentDashboardComponent } from './appointment-dashboard/appointment-dashboard.component';
import { AdminAppointmentListComponent } from './admin-appointment-list/admin-appointment-list.component';
// tslint:disable-next-line:max-line-length
import { AdminAppointmentListItemComponent } from './admin-appointment-list/admin-appointment-list-item/admin-appointment-list-item.component';

const routes: Routes = [
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'new-appointment-dialog', component: NewAppointmentDialogComponent },
  { path: 'admin-appointments', component: AdminAppointmentListComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AppointmentListComponent,
    NewAppointmentDialogComponent,
    AppointmentDashboardComponent,
    AdminAppointmentListComponent,
    AdminAppointmentListItemComponent
  ],
  providers: [
    CarService,
    CarServiceService,
    AppointmentService
  ]
})
export class AppointmentModule { }
