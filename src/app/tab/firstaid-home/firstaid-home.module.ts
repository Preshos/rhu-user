import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstaidHomePageRoutingModule } from './firstaid-home-routing.module';

import { FirstaidHomePage } from './firstaid-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstaidHomePageRoutingModule
  ],
  declarations: [FirstaidHomePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FirstaidHomePageModule {}
