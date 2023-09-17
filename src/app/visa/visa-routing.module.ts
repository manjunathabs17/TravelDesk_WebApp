import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisaHomeComponent } from './visa-home/visa-home.component';

const routes: Routes = [
  {
    path:'',
    component:VisaHomeComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisaRoutingModule { }
