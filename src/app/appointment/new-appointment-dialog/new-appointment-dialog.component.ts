import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Car } from '../../car/car.model';
import { CarService } from '../../car/car.service';
import { CarServiceService } from '../../car-service/car-service.service';
import { CarServiceModel } from '../../car-service/car-service.model';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/auth.service';
import { Appointment } from '../appointment.model';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';


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
  cars: Observable<Car[]>;
  times: Time[];

  constructor(
    public dialogRef: MatDialogRef<NewAppointmentDialogComponent>,
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private carServiceService: CarServiceService,
    private carService: CarService,
    private auth: AuthService,
    private router: Router
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
      startDate: new FormControl(new Date()),
      startTime: ['']
    });
  }

  buildCarArray() {
    this.auth.user.subscribe(() => this.cars = this.carService.getCars());
  }

  buildCarServiceArray() {
    console.log('From buildCarServiceArray:');
    this.carServiceService.getCarServices().subscribe((carServices) =>
      this.carServices = carServices);
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
    const formData: Appointment = {
      userId: this.auth.currentUserId,
      car: this.appointmentForm.get('car').value,
      service: this.appointmentForm.get('carService').value,
      startDate: this.appointmentForm.get('startDate').value,
      startTime: this.appointmentForm.get('startTime').value,
      finishDate: null,
      finishTime: null,
      status: 'Scheduled'
    };

    this.appointmentService.create(formData);
    this.appointmentForm.reset();
    console.log('Before router to appointents');
    this.router.navigate(['/appointments']);
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
