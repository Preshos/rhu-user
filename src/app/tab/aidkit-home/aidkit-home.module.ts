import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AidkitHomePageRoutingModule } from './aidkit-home-routing.module';

import { AidkitHomePage } from './aidkit-home.page';

@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    IonicModule,
    AidkitHomePageRoutingModule
  ],
  declarations: [AidkitHomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AidkitHomePageModule {}
