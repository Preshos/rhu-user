import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HerbHomePage } from './herb-home.page';

const routes: Routes = [
  {
    path: '',
    component: HerbHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HerbHomePageRoutingModule {}
