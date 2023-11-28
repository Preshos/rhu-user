import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashPageRoutingModule } from './splash-routing.module';

import { SplashPage } from './splash.page';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web'
export function playerfactory(){
  return player
}
@NgModule({
  imports: [
    LottieModule.forRoot({player:playerfactory}),
    CommonModule,
    FormsModule,
    IonicModule,
    SplashPageRoutingModule
  ],
  declarations: [SplashPage]
})
export class SplashPageModule {}
