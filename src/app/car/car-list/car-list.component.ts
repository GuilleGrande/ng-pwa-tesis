import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../car.model';
import { CarService } from '../car.service';
import { AuthService } from '../../core/auth.service';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars: Observable<Car[]>;

  constructor(
    private carService: CarService,
    private auth: AuthService) {}

  ngOnInit() {
    this.auth.user.subscribe(() => this.cars = this.carService.getCars());
  }
}
