import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmergencyDetailsPageRoutingModule } from './emergency-details-routing.module';

import { EmergencyDetailsPage } from './emergency-details.page';

import { AutosizeModule } from 'ngx-autosize';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmergencyDetailsPageRoutingModule,
    AutosizeModule
  ],
  declarations: [EmergencyDetailsPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EmergencyDetailsPageModule {}
