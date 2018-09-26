import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/upload.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    UploadComponent,
    NavbarComponent
  ],
  declarations: [UploadComponent, NavbarComponent],
  providers: [UploadService]
})
export class SharedModule { }
