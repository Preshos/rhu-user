import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HerbDetailsPage } from './herb-details.page';

const routes: Routes = [
  {
    path: '',
    component: HerbDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HerbDetailsPageRoutingModule {}
