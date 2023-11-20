import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AidkitDetailsPageRoutingModule } from './aidkit-details-routing.module';

import { AidkitDetailsPage } from './aidkit-details.page';
import { AutosizeModule } from 'ngx-autosize';

@NgModule({
  imports: [
    AutosizeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AidkitDetailsPageRoutingModule
  ],
  declarations: [AidkitDetailsPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AidkitDetailsPageModule {}
