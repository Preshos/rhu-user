import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HerbUpdatePage } from './herb-update.page';

const routes: Routes = [
  {
    path: '',
    component: HerbUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HerbUpdatePageRoutingModule {}
