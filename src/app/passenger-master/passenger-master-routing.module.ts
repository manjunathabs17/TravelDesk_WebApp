import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassengerHomeComponent } from './passenger-home/passenger-home.component';

const routes: Routes = [
  {
    path:'',
    component:PassengerHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengerMasterRoutingModule { }
