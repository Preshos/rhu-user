import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstaidDetailsPageRoutingModule } from './firstaid-details-routing.module';

import { FirstaidDetailsPage } from './firstaid-details.page';
import { AutosizeModule } from 'ngx-autosize';
@NgModule({
  imports: [
    AutosizeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FirstaidDetailsPageRoutingModule
  ],
  declarations: [FirstaidDetailsPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FirstaidDetailsPageModule {}
