import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstaidCreatePage } from './firstaid-create.page';

const routes: Routes = [
  {
    path: '',
    component: FirstaidCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstaidCreatePageRoutingModule {}
