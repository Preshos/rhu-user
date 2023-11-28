import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstaidInfoPage } from './firstaid-info.page';

const routes: Routes = [
  {
    path: '',
    component: FirstaidInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstaidInfoPageRoutingModule {}
