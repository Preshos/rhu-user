import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AidkitUpdatePage } from './aidkit-update.page';

const routes: Routes = [
  {
    path: '',
    component: AidkitUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AidkitUpdatePageRoutingModule {}
