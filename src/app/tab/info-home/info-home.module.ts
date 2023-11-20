import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoHomePageRoutingModule } from './info-home-routing.module';

import { InfoHomePage } from './info-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoHomePageRoutingModule
  ],
  declarations: [InfoHomePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class InfoHomePageModule {}
