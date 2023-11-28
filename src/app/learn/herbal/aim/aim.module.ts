import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AimPageRoutingModule } from './aim-routing.module';

import { AimPage } from './aim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AimPageRoutingModule
  ],
  declarations: [AimPage]
})
export class AimPageModule {}
