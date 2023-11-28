import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';

register(); 
import { App } from '@capacitor/app';
import { Platform, NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isAdmin: boolean;

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private router: Router,
    private authService : AuthService,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.setupBackButtonListener();
  }

  async setupBackButtonListener() {
    this.platform.backButton.subscribeWithPriority(0, async () => {
      const currentRoute = this.router.url;

      if (currentRoute === '/login') {
        App.exitApp();
      } else if (currentRoute === '/tabs/tabs/herb-home') {
        await this.confirmExit();
      } else {
        await this.navCtrl.pop();
      }
    });
  }

  async confirmExit() {
    const alert = await this.alertController.create({
      header: 'Exit App',
      message: 'Do you wish to exit the app?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Yes',
          handler: () => {
            App.exitApp(); // Exit the app
          },
        },
      ],
    });

    await alert.present();
  }
  
  ngOnInit(){
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
   }
}
