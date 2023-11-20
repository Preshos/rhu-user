import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmergencyUpdatePageRoutingModule } from './emergency-update-routing.module';

import { EmergencyUpdatePage } from './emergency-update.page';
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
    EmergencyUpdatePageRoutingModule
  ],
  declarations: [EmergencyUpdatePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EmergencyUpdatePageModule {}
