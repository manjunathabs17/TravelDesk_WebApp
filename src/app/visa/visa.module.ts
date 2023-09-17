import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisaRoutingModule } from './visa-routing.module';
import { VisaHomeComponent } from './visa-home/visa-home.component';
import { AddVisaComponent } from './add-visa/add-visa.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [VisaHomeComponent, AddVisaComponent],
  imports: [
    CommonModule,
    VisaRoutingModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,

    MatNativeDateModule,
    MatIconModule,

    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    MatDialogModule,
  ],
})
export class VisaModule {}
