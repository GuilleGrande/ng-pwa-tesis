import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarServiceDashboardComponent } from './car-service-dashboard/car-service-dashboard.component';
import { CarServiceDetailComponent } from './car-service-detail/car-service-detail.component';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'car-service', component: CarServiceDashboardComponent },
  { path: 'car-service/:name', component: CarServiceDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  declarations: [
    CarServiceDashboardComponent,
    CarServiceDetailComponent,
  ]
})
export class CarServicesModule { }
