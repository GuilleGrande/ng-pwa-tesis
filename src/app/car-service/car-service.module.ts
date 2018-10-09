import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarServiceDashboardComponent } from './car-service-dashboard/car-service-dashboard.component';
import { CarServiceDetailComponent } from './car-service-detail/car-service-detail.component';
import { CarServiceGridListComponent } from './car-service-grid-list/car-service-grid-list.component';
import { CarServiceGridListItemComponent } from './car-service-grid-list-item/car-service-grid-list-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CarServiceDashboardComponent,
    CarServiceDetailComponent,
    CarServiceGridListComponent,
    CarServiceGridListItemComponent
  ]
})
export class CarServicesModule { }
