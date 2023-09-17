import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { TravelBookingModule } from './travel-booking.module';
import { TravelHomeComponent } from './travel-home/travel-home.component';

const routes: Routes = [
  {
    path:'',
    component:TravelHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelBookingRoutingModule { }
