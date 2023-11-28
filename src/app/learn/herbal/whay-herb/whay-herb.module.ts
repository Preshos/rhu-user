import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhayHerbPageRoutingModule } from './whay-herb-routing.module';

import { WhayHerbPage } from './whay-herb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhayHerbPageRoutingModule
  ],
  declarations: [WhayHerbPage]
})
export class WhayHerbPageModule {}
