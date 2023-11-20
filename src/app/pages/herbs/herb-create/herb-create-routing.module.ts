import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HerbCreatePage } from './herb-create.page';

const routes: Routes = [
  {
    path: '',
    component: HerbCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HerbCreatePageRoutingModule {}
