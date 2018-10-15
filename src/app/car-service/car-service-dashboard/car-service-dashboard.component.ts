import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { CarServiceService } from '../car-service.service';
import { CarServiceModel } from '../car-service.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-car-service-dashboard',
  templateUrl: './car-service-dashboard.component.html',
  styleUrls: ['./car-service-dashboard.component.css']
})
export class CarServiceDashboardComponent implements OnInit {

  carServices: Observable<CarServiceModel[]>;

  constructor(
    private auth: AuthService,
    private carServiceService: CarServiceService ) { }

  ngOnInit() {
    this.getCarServices();
  }

  getCarServices() {
    this.carServices = this.carServiceService.getCarServices();
  }
}
