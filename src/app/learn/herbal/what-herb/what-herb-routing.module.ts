import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatHerbPage } from './what-herb.page';

const routes: Routes = [
  {
    path: '',
    component: WhatHerbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatHerbPageRoutingModule {}
