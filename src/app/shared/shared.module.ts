import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/upload.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    UploadComponent
  ],
  declarations: [UploadComponent],
  providers: [UploadService]
})
export class SharedModule { }
