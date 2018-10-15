import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewCarDialogComponent } from '../../car/new-car-dialog/new-car-dialog.component';
import { Car } from '../../car/car.model';
import { NewAppointmentDialogComponent } from '../../appointment/new-appointment-dialog/new-appointment-dialog.component';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.css']
})
export class FabComponent implements OnInit {

  fabButtons = [
    { icon: 'directions_car', path: 'new-car' },
    { icon: 'calendar_today', path: 'new-appointment' },
  ];

  buttons = [];
  fabTogglerState = 'inactive';

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  openDialog(source) {
    if (source.path === 'new-car') {
      const dialogRef = this.dialog.open(NewCarDialogComponent, {
        maxWidth: '600px'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    } else {
      const dialogRef = this.dialog.open(NewAppointmentDialogComponent, {
        maxWidth: '600px'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }
}

