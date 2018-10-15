import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Car } from '../../car/car.model';
import { CarService } from '../../car/car.service';
import { CarServiceService } from '../../car-service/car-service.service';
import { CarServiceModel } from '../../car-service/car-service.model';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/auth.service';

export interface Time {
  hour: string;
}

@Component({
  selector: 'app-new-appointment-dialog',
  templateUrl: './new-appointment-dialog.component.html',
  styleUrls: ['./new-appointment-dialog.component.css']
})
export class NewAppointmentDialogComponent implements OnInit {

  appointmentForm: FormGroup;
  minDate = new Date().getDate();
  carServices: CarServiceModel[];
  cars: Car[];
  times: Time[];

  constructor(
    public dialogRef: MatDialogRef<NewAppointmentDialogComponent>,
    private formBuilder: FormBuilder,
    private carServiceService: CarServiceService,
    private carService: CarService,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.createForm();
    this.buildCarArray();
    this.buildCarServiceArray();
    this.buildTimeSlots();
  }

  createForm() {
    this.appointmentForm = this.formBuilder.group({
      carService:  [''],
      car: [''],
      startDate: [''],
      startTime: ['']
    });
  }

  buildCarArray() {
    // this.auth.user.subscribe(() => this.cars = this.carService.getCars());
    this.carService.getCars().subscribe((cars) => this.cars = cars)
  }

  buildCarServiceArray() {
    this.carServiceService.getCarServices().subscribe((carServices) => this.carServices = carServices);
  }

  buildTimeSlots() {
    this.times = [
      { hour: '08:00' },
      { hour: '08:30' },
      { hour: '09:00' },
      { hour: '09:30' },
      { hour: '10:00' },
      { hour: '10:30' },
      { hour: '11:00' },
      { hour: '11:30' },
      { hour: '12:00' },
      { hour: '12:30' },
      { hour: '13:00' },
      { hour: '13:30' },
      { hour: '14:00' },
      { hour: '14:30' },
      { hour: '15:00' },
      { hour: '15:30' },
      { hour: '16:00' },
      { hour: '16:30' },
      { hour: '15:00' }
    ];
  }

  saveAppointment() {
    return;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
