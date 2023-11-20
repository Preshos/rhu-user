import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstaidUpdatePageRoutingModule } from './firstaid-update-routing.module';

import { FirstaidUpdatePage } from './firstaid-update.page';

import { AutosizeModule } from 'ngx-autosize';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web'
export function playerfactory(){
  return player
}
@NgModule({
  imports: [
    AutosizeModule,
    ReactiveFormsModule,
    LottieModule.forRoot({player:playerfactory}),
    CommonModule,
    FormsModule,
    IonicModule,
    FirstaidUpdatePageRoutingModule
  ],
  declarations: [FirstaidUpdatePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FirstaidUpdatePageModule {}
