import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AimHerbPage } from './aim-herb.page';

const routes: Routes = [
  {
    path: '',
    component: AimHerbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AimHerbPageRoutingModule {}
