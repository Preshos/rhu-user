import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';

register(); 
import { App } from '@capacitor/app';
import { Platform, NavController, AlertController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private tabHistory: string[] = [];
  isAdmin: boolean;
  private resumeSubscription: Subscription;
  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private router: Router,
    private authService : AuthService,
    private alertController: AlertController
  ) {
    this.initializeApp();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateTabHistory(event.urlAfterRedirects);
      }
    });
  }

  private updateTabHistory(route: string) {
    const tabRoute = route.split('/').pop();
    if (tabRoute && !this.tabHistory.includes(tabRoute)) {
      this.tabHistory.push(tabRoute);
    }
  }

  ionViewWillEnter() {
    this.setupBackButtonListener();
  }

  initializeApp() {
    this.setupBackButtonListener();
  
    // Subscribe to resume event and set up the back button listener again on resume
    this.resumeSubscription = this.platform.resume.subscribe(() => {
      this.setupBackButtonListener();
  
      // // Check if the current route is not 'tabs/tabs/herb-home'
      // if (this.router.url !== '/tabs/tabs/herb-home') {
      //   // Redirect to 'tabs/tabs/herb-home'
      //   this.router.navigate(['/tabs/tabs/herb-home']);
      // }// Check if the current route is not 'tabs/tabs/herb-home'

      // if (this.router.url == '/login') {
      //   this.router.navigate(['/login']);
      // }

    });
  }

  ngOnDestroy() {
    // Unsubscribe from resume event to avoid memory leaks
    this.resumeSubscription.unsubscribe();
  }

  // async setupBackButtonListener() {
  //   this.platform.backButton.subscribeWithPriority(0, async () => {
  //     const currentRoute = this.router.url;
  
  //     if (currentRoute === '/login') {
  //       App.exitApp();
  //     } else if (currentRoute === '/tabs/tabs/herb-home') {
  //       await this.confirmExit();
  //     } else if (currentRoute.startsWith('/tabs/tabs/')) {
  //       await this.navCtrl.navigateBack(['/tabs/tabs/' , currentRoute]);
  //     } else {
  //       await this.navCtrl.pop();
  //     }
  //   });
  // }

  async setupBackButtonListener() {
    this.platform.backButton.subscribeWithPriority(0, async () => {
      const currentRoute = this.router.url;
  
      if (currentRoute === '/login') {
        App.exitApp();
      } 
      else if (currentRoute === '/tabs/tabs/herb-home') {
        // Show confirmation exit when on 'herb-home'
        await this.confirmExit();
      }
      else if (currentRoute.startsWith('/tabs/tabs/')) {
          const tabRoute = currentRoute.split('/').pop();
          const previousTabIndex = this.getPreviousTabIndex(tabRoute);

          if (previousTabIndex !== null) {
            this.tabHistory.pop();
            await this.navCtrl.navigateBack([`/tabs/tabs/${previousTabIndex}`]);
          }else if (previousTabIndex === '0'){
            await this.confirmExit();
          }
      } 
      else {
        await this.navCtrl.pop();
      }
    });
  }
  
  private getPreviousTabIndex(currentTab: string): string | null {
    const currentIndex = this.tabHistory.indexOf(currentTab);

    if (currentIndex > 0) {
      return this.tabHistory[currentIndex - 1];
    }

    return currentIndex === 0 ? null : this.tabHistory[this.tabHistory.length - 1];
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
      cssClass: 'custom-logout',
    });
  
    await alert.present();
  }
  
  ngOnInit(){
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
   }
}
