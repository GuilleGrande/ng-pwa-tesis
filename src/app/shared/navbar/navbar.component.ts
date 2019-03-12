import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<User>;
  navLinks = [];

  constructor(public auth: AuthService, private router: Router) {
    this.user = this.auth.user;
  }

  ngOnInit() {
    this.user.subscribe((user) => {
      if (user.roles.client) {
        this.navLinks = [
          { path: 'car-service', label: 'Services', index: 0 },
          { path: 'cars', label: 'Cars', index: 1 },
          { path: 'appointments', label: 'Appointments', index: 2 }
        ];
      } else if (user.roles.admin) {
        this.navLinks = [
          { path: 'users', label: 'Users', index: 0 },
          { path: 'admin-appointments', label: 'Appointments', index: 1 }
        ];
      }
    });
  }

}
