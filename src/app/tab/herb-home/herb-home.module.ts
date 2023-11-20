import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HerbHomePageRoutingModule } from './herb-home-routing.module';

import { HerbHomePage } from './herb-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HerbHomePageRoutingModule
  ],
  declarations: [HerbHomePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HerbHomePageModule {}
