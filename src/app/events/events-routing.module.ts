import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsAddComponent } from './events-add/events-add.component';
import { EventsHomeComponent } from './events-home/events-home.component';

const routes: Routes = [
  {
    path:'',
    component:EventsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
