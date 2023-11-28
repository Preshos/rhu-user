import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HerbalInfoPage } from './herbal-info.page';

const routes: Routes = [
  {
    path: '',
    component: HerbalInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HerbalInfoPageRoutingModule {}
