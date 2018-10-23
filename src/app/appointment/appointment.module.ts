import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentDashboardComponent } from './appointment-dashboard/appointment-dashboard.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentListItemComponent } from './appointment-list-item/appointment-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { NewAppointmentDialogComponent } from './new-appointment-dialog/new-appointment-dialog.component';
import { Routes, RouterModule } from '@angular/router';
import { CarService } from '../car/car.service';
import { CarServiceService } from '../car-service/car-service.service';
import { AppointmentService } from './appointment.service';

const routes: Routes = [
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'appointments/:userId/:id', component: AppointmentDetailComponent },
  { path: 'new-appointment-dialog', component: NewAppointmentDialogComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AppointmentDashboardComponent,
    AppointmentDetailComponent,
    AppointmentListComponent,
    AppointmentListItemComponent,
    NewAppointmentDialogComponent
  ],
  providers: [
    CarService,
    CarServiceService,
    AppointmentService
  ]
})
export class AppointmentModule { }
