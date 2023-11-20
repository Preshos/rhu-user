import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmergencyCreatePage } from './emergency-create.page';

const routes: Routes = [
  {
    path: '',
    component: EmergencyCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmergencyCreatePageRoutingModule {}
