import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HerbalInfoPageRoutingModule } from './herbal-info-routing.module';

import { HerbalInfoPage } from './herbal-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HerbalInfoPageRoutingModule
  ],
  declarations: [HerbalInfoPage]
})
export class HerbalInfoPageModule {}
