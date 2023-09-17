import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  {
    path:'visa',
    loadChildren:()=>import('../app/visa/visa.module').then((visa)=>visa.VisaModule)
  },
  {
    path:'accescontrol',
    loadChildren:()=>import('../app/access-control/access-control.module').then((accescontrol)=>accescontrol.AccessControlModule)
  },
  {
    path:'company',
    loadChildren:()=>import('../app/company-master/company-master.module').then((company)=>company.CompanyMasterModule)
  },
  {
    path:'passenger',
    loadChildren:()=>import('../app/passenger-master/passenger-master.module').then((passenger)=>passenger.PassengerMasterModule)
  },

  {
    path:'events',
    loadChildren:()=>import('../app/events/events.module').then((event)=>event.EventsModule)
  },

  {
    path:'travel',
    loadChildren:()=>import('../app/travel-booking/travel-booking.module').then((travel)=>travel.TravelBookingModule)
  },
  {
    path:'passport',
    loadChildren:()=>import('../app/passport/passport.module').then((passport)=>passport.PassportModule)
  },
  {
    path:'forex',
    loadChildren:()=>import('../app/forex-page/forex-page.module').then((forex)=>forex.ForexPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }