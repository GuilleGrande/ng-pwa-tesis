import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ]
})
export class MaterialModule { }
