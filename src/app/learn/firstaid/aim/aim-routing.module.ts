import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AimPage } from './aim.page';

const routes: Routes = [
  {
    path: '',
    component: AimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AimPageRoutingModule {}
