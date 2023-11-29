import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingpagePageRoutingModule } from './landingpage-routing.module';

import { LandingpagePage } from './landingpage.page';
import { Onboard1Component } from 'src/app/components/onboard1/onboard1.component';
import { Onboard2Component } from 'src/app/components/onboard2/onboard2.component';
import { Onboard3Component } from 'src/app/components/onboard3/onboard3.component';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web'

export function playerfactory(){
  return player
}
@NgModule({
  imports: [
    CommonModule,
    LottieModule.forRoot({player:playerfactory}),
    FormsModule,
    IonicModule,
    LandingpagePageRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [LandingpagePage, Onboard1Component, Onboard2Component, Onboard3Component]
})
export class LandingpagePageModule {}
