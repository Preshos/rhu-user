import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstaidCreatePageRoutingModule } from './firstaid-create-routing.module';

import { FirstaidCreatePage } from './firstaid-create.page';
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
    FirstaidCreatePageRoutingModule
  ],
  declarations: [FirstaidCreatePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FirstaidCreatePageModule {}
