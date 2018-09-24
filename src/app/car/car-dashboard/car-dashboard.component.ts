import { AuthService } from '../../core/auth.service';
import { AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireStorage } from 'angularfire2/storage';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CarService } from '../car.service';
import { Car } from '../car.model';
import { User } from '../../user/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface Year {
  value: string;
}

export interface CarColor {
  value: string;
}

@Component({
  selector: 'app-car-dashboard',
  templateUrl: './car-dashboard.component.html',
  styleUrls: ['./car-dashboard.component.css']
})
export class CarDashboardComponent implements OnInit {

  user: User;
  years: Year[] = [{ value: '--'}];
  colors: CarColor[];
  carForm: FormGroup;
  imageUrl: string;
  uploadProgress: Observable<number>;
  downloadUrl: Observable<string>;

  constructor(
    private carService: CarService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.buildYearArray();
    this.buildColorArray();
  }

  createForm() {
    this.carForm = this.formBuilder.group({
      year:  [''],
      make: [''],
      model: [''],
      color: ['']
    });
  }

  buildYearArray() {
    const currentYear = new Date().getFullYear();

    for (let i = currentYear; i >= 1940 ; i--) {
      this.years.push({ value:  i.toString() });
    }
  }

  buildColorArray() {
    this.colors = [
      { value: 'Black'     },
      { value: 'White'     },
      { value: 'Red'       },
      { value: 'Green'     },
      { value: 'Blue'      },
      { value: 'Yellow'    },
      { value: 'Orange'    },
      { value: 'Grey'      },
      { value: 'Silver'    },
    ];
  }

  saveCar() {
    const formData: Car = {
      owner: this.auth.currentUserId,
      year: this.carForm.get('year').value,
      make: this.carForm.get('make').value,
      model: this.carForm.get('model').value,
      color: this.carForm.get('color').value,
      image: this.imageUrl || null,
      appointmentCount: 0
    };

    this.carService.create(formData);
    this.carForm.reset();
    this.imageUrl = '';
    this.router.navigate(['/cars']);
  }

  uploadCarPhoto(event) {
    const file = event.target.files[0];
    const path = `cars/${file.name}`;

    if (file.type.split('/')[0] !== 'image') {
      return alert('Only images allowed');
    } else {
      const task = this.storage.upload(path, file);
      const fileRef = this.storage.ref(path);

      task.snapshotChanges().subscribe(() =>
        fileRef.getDownloadURL().subscribe((url) =>
            this.imageUrl = url));

      this.uploadProgress = task.percentageChanges();
      console.log('Image uploaded!');

    }

  }
}
