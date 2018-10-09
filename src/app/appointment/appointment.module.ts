import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentDashboardComponent } from './appointment-dashboard/appointment-dashboard.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentListItemComponent } from './appointment-list-item/appointment-list-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AppointmentDashboardComponent, AppointmentDetailComponent, AppointmentListComponent, AppointmentListItemComponent]
})
export class AppointmentModule { }
