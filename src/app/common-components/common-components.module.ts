import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonComponentsRoutingModule } from './common-components-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';

@NgModule({
  declarations: [SideNavComponent, TopNavComponent],
  imports: [CommonModule, CommonComponentsRoutingModule],
  exports: [SideNavComponent, TopNavComponent],
})
export class CommonComponentsModule {}
