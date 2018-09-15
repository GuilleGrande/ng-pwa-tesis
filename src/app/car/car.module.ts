import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarDashboardComponent } from './car-dashboard/car-dashboard.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarListItemComponent } from './car-list-item/car-list-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CarDashboardComponent, CarDetailComponent, CarListComponent, CarListItemComponent]
})
export class CarModule { }
