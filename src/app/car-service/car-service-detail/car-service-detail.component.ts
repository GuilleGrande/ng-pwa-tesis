import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarServiceService } from '../car-service.service';
import { CarService } from '../../car/car.service';

@Component({
  selector: 'app-car-services-detail',
  templateUrl: './car-service-detail.component.html',
  styleUrls: ['./car-service-detail.component.css']
})
export class CarServiceDetailComponent implements OnInit {

  carService: CarService;

  constructor(
    private router: ActivatedRoute,
    private carServiceService: CarServiceService,
    private routing: Router
  ) { }

  ngOnInit() {
    this.getCarService();
  }

  getCarService() {
    const carServiceName = this.router.snapshot.paramMap.get('name');
    this.carServiceService.getCarService(carServiceName).
      subscribe((carService) => this.carService = carService);
  }

  bookApointmentRedirect() {
    this.routing.navigate(['/appointments']);
  }

}
