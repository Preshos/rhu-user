import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatPageRoutingModule } from './what-routing.module';

import { WhatPage } from './what.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatPageRoutingModule
  ],
  declarations: [WhatPage]
})
export class WhatPageModule {}
