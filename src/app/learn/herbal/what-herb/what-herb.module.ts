import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatHerbPageRoutingModule } from './what-herb-routing.module';

import { WhatHerbPage } from './what-herb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatHerbPageRoutingModule
  ],
  declarations: [WhatHerbPage]
})
export class WhatHerbPageModule {}
