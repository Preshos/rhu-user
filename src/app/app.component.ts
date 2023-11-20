import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';

register(); 
import { App } from '@capacitor/app';
import { Platform, NavController } from '@ionic/angular';
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
    private authService : AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.setupBackButtonListener();
  }

  setupBackButtonListener() {
    this.platform.backButton.subscribeWithPriority(0, async () => {
      const currentRoute = this.router.url;

      if (currentRoute === '/login') {
          App.exitApp();
      } else if (currentRoute === '/tabs/tabs/herb-home') {
          App.exitApp();
      } else {
        await this.navCtrl.pop();
      }
    });
  }
  
  ngOnInit(){
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
   }
}
