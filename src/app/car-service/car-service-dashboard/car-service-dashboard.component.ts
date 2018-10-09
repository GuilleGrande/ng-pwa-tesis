import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

export interface CarService {
  name: string;
  color: string;
}

@Component({
  selector: 'app-car-service-dashboard',
  templateUrl: './car-service-dashboard.component.html',
  styleUrls: ['./car-service-dashboard.component.css']
})
export class CarServiceDashboardComponent implements OnInit {

  carService: CarService[];

  constructor(private auth: AuthService, ) { }

  ngOnInit() {
    this.buildCarServiceGrid();
  }

  buildCarServiceGrid() {
    this.carService = [
      { name: 'Oil change', color: 'lightgrey' },
      { name: 'Exhaust & Mufflers', color: 'lightgrey' },
      { name: 'Brakes', color: 'lightgrey' },
      { name: 'Tires & Wheels', color: 'lightgrey' },
      { name: 'A/C', color: 'lightgrey' },
      { name: 'Steering & Suspension', color: 'lightgrey' },
      { name: 'Battery', color: 'lightgrey' },
      { name: 'CV Joints & Driveshafts', color: 'lightgrey' }
    ];
  }

}
