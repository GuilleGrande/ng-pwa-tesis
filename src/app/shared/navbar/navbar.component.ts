import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navLinks = [
    { path: 'services', label: 'Services'},
    { path: 'cars', label: 'Cars'},
    { path: 'appointments', label: 'Appointments'},
  ];

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
