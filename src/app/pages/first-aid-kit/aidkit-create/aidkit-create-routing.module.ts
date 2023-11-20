import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AidkitCreatePage } from './aidkit-create.page';

const routes: Routes = [
  {
    path: '',
    component: AidkitCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AidkitCreatePageRoutingModule {}
