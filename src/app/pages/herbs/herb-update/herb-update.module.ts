import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HerbUpdatePageRoutingModule } from './herb-update-routing.module';
import { HerbUpdatePage } from './herb-update.page';
import { AutosizeModule } from 'ngx-autosize';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web'
export function playerfactory(){
  return player
}
@NgModule({
  imports: [
    AutosizeModule,
    LottieModule.forRoot({player:playerfactory}),
    CommonModule,
    FormsModule,
    IonicModule,
    HerbUpdatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HerbUpdatePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HerbUpdatePageModule {}
