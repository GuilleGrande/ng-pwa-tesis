import { CarDashboardComponent } from './car-dashboard/car-dashboard.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarService } from './car.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NewCarDialogComponent } from './new-car-dialog/new-car-dialog.component';

const routes: Routes = [
  { path: 'cars', component: CarListComponent },
  { path: 'new-car', component: NewCarDialogComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CarDashboardComponent,
    CarListComponent,
    NewCarDialogComponent
  ],
  exports: [
    CarDashboardComponent,
    NewCarDialogComponent
  ],
  providers: [
    CarService
  ]
})
export class CarModule { }
