import { CarDashboardComponent } from './car-dashboard/car-dashboard.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarListItemComponent } from './car-list-item/car-list-item.component';
import { CarService } from './car.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'cars', component: CarListComponent },
  { path: 'cars/:id', component: CarDetailComponent }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CarDashboardComponent, 
    CarDetailComponent, 
    CarListComponent, 
    CarListItemComponent
  ],
  exports: [
    CarDashboardComponent
  ],
  providers: [
    CarService
  ]
})
export class CarModule { }
