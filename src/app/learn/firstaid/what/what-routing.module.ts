import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatPage } from './what.page';

const routes: Routes = [
  {
    path: '',
    component: WhatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatPageRoutingModule {}
