import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstaidHomePage } from './firstaid-home.page';

const routes: Routes = [
  {
    path: '',
    component: FirstaidHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstaidHomePageRoutingModule {}
