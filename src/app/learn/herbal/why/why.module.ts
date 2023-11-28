import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhyPageRoutingModule } from './why-routing.module';

import { WhyPage } from './why.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhyPageRoutingModule
  ],
  declarations: [WhyPage]
})
export class WhyPageModule {}
