import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyEmailPageRoutingModule } from './verify-email-routing.module';

import { VerifyEmailPage } from './verify-email.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyEmailPageRoutingModule
  ],
  declarations: [VerifyEmailPage]
})
export class VerifyEmailPageModule {}
