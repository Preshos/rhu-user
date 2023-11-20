import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HerbDetailsPageRoutingModule } from './herb-details-routing.module';

import { HerbDetailsPage } from './herb-details.page';
import { AutosizeModule } from 'ngx-autosize';

@NgModule({
  imports: [
    AutosizeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HerbDetailsPageRoutingModule
  ],
  declarations: [HerbDetailsPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HerbDetailsPageModule {}
