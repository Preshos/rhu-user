import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmergencyHomePageRoutingModule } from './emergency-home-routing.module';

import { EmergencyHomePage } from './emergency-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmergencyHomePageRoutingModule
  ],
  declarations: [EmergencyHomePage]
})
export class EmergencyHomePageModule {}
