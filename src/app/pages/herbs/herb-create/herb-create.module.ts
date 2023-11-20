import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HerbCreatePageRoutingModule } from './herb-create-routing.module';
import { HerbCreatePage } from './herb-create.page';
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
    HerbCreatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HerbCreatePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HerbCreatePageModule {}
