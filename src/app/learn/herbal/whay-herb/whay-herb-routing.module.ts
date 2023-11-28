import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhayHerbPage } from './whay-herb.page';

const routes: Routes = [
  {
    path: '',
    component: WhayHerbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhayHerbPageRoutingModule {}
