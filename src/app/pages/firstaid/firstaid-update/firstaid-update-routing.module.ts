import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstaidUpdatePage } from './firstaid-update.page';

const routes: Routes = [
  {
    path: '',
    component: FirstaidUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstaidUpdatePageRoutingModule {}
