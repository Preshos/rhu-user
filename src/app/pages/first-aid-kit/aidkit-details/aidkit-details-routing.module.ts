import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AidkitDetailsPage } from './aidkit-details.page';

const routes: Routes = [
  {
    path: '',
    component: AidkitDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AidkitDetailsPageRoutingModule {}
