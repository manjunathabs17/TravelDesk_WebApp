import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForexPageRoutingModule } from './forex-page-routing.module';
import { ForexHomeComponent } from './forex-home/forex-home.component';
import { AddForexComponent } from './add-forex/add-forex.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ForexHomeComponent, AddForexComponent],
  imports: [
    CommonModule,
    ForexPageRoutingModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    SharedModule,
  ],
})
export class ForexPageModule {}
