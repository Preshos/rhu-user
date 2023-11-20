import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmergencyHomePage } from './emergency-home.page';

const routes: Routes = [
  {
    path: '',
    component: EmergencyHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmergencyHomePageRoutingModule {}
