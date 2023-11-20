import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AidkitCreatePageRoutingModule } from './aidkit-create-routing.module';

import { AidkitCreatePage } from './aidkit-create.page';

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
    AidkitCreatePageRoutingModule
  ],
  declarations: [AidkitCreatePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AidkitCreatePageModule {}
