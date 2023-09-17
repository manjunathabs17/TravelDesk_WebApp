import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengerMasterRoutingModule } from './passenger-master-routing.module';
import { PassengerHomeComponent } from './passenger-home/passenger-home.component';
import { PassengerAddComponent } from './passenger-add/passenger-add.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [PassengerHomeComponent, PassengerAddComponent],
  imports: [
    CommonModule,
    PassengerMasterRoutingModule,
    // BrowserModule,
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
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
})
export class PassengerMasterModule {}
