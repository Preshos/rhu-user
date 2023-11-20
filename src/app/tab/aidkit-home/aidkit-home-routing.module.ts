import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AidkitHomePage } from './aidkit-home.page';

const routes: Routes = [
  {
    path: '',
    component: AidkitHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AidkitHomePageRoutingModule {}
