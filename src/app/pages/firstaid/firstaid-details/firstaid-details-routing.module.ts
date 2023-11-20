import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstaidDetailsPage } from './firstaid-details.page';

const routes: Routes = [
  {
    path: '',
    component: FirstaidDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstaidDetailsPageRoutingModule {}
