import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
//for firebase
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
//for lottie animations
import { LottieModule} from 'ngx-lottie';
import player from 'lottie-web';
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AutosizeModule } from 'ngx-autosize';
import { IonicStorageModule } from '@ionic/storage-angular';

defineElement(lottie.loadAnimation);
export function playerfactory(){
  return player
}

@NgModule({
  declarations: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    AutosizeModule,
    BrowserModule,
    LottieModule.forRoot({player:playerfactory}),
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule, 
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()), 
    provideStorage(() => getStorage())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})

export class AppModule {}
