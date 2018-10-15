import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/upload.service';
import { NavbarComponent } from './navbar/navbar.component';
import { Routes, RouterModule } from '@angular/router';
import { CarServiceDashboardComponent } from '../car-service/car-service-dashboard/car-service-dashboard.component';
import { CarListComponent } from '../car/car-list/car-list.component';
import { AppointmentDashboardComponent } from '../appointment/appointment-dashboard/appointment-dashboard.component';
import { FabComponent } from './fab/fab.component';

const routes: Routes = [
  { path: 'service', component: CarServiceDashboardComponent, data: { title: 'Services' } },
  { path: 'cars', component: CarListComponent, data: { title: 'Cars' } },
  { path: 'appointments', component: AppointmentDashboardComponent, data: { title: 'Appointments' } }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    UploadComponent,
    NavbarComponent,
    FabComponent
  ],
  declarations: [UploadComponent, NavbarComponent, FabComponent],
  providers: [UploadService]
})
export class SharedModule { }
