import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { MaterialModule } from './/material.module';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CarModule } from './car/car.module';
import { SharedModule } from './shared/shared.module';
import { CarServicesModule } from './car-service/car-service.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MaterialModule,
    CarModule,
    SharedModule,
    CarServicesModule,
    AppointmentModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
