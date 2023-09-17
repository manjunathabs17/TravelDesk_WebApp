import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassportAddComponent } from './passport-add/passport-add.component';
import { PassportHomeComponent } from './passport-home/passport-home.component';

const routes: Routes = [
{
  path:'',
  component:PassportHomeComponent
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportRoutingModule { }
