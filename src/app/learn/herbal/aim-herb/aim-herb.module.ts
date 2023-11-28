import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AimHerbPageRoutingModule } from './aim-herb-routing.module';

import { AimHerbPage } from './aim-herb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AimHerbPageRoutingModule
  ],
  declarations: [AimHerbPage]
})
export class AimHerbPageModule {}
