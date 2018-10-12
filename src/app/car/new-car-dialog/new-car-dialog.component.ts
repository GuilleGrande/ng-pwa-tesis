import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-car-dialog',
  templateUrl: './new-car-dialog.component.html',
  styleUrls: ['./new-car-dialog.component.css']
})
export class NewCarDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewCarDialogComponent>
    ) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
