// import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelBookingRoutingModule } from './travel-booking-routing.module';
import { TravelHomeComponent } from './travel-home/travel-home.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { UploadInvoiceComponent } from './upload-invoice/upload-invoice.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    TravelHomeComponent,
    AddBookingComponent,
    UploadInvoiceComponent,
  ],
  imports: [
    CommonModule,
    TravelBookingRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    MatDialogModule,
  ],
})
export class TravelBookingModule {}
