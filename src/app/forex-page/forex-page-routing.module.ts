import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForexHomeComponent } from './forex-home/forex-home.component';

const routes: Routes = [
  {
    path:'',
    component:ForexHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForexPageRoutingModule { }
