import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstaidInfoPageRoutingModule } from './firstaid-info-routing.module';

import { FirstaidInfoPage } from './firstaid-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstaidInfoPageRoutingModule
  ],
  declarations: [FirstaidInfoPage]
})
export class FirstaidInfoPageModule {}
