import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoHomePage } from './info-home.page';

const routes: Routes = [
  {
    path: '',
    component: InfoHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoHomePageRoutingModule {}
