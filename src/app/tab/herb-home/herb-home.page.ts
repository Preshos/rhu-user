import { Component, OnInit, ViewChild } from '@angular/core';
import { HerbInfo } from 'src/app/services/herbs/herb';
import { HerbinfoService } from 'src/app/services/herbs/herbinfo.service';
import { HerbCreatePage } from 'src/app/pages/herbs/herb-create/herb-create.page';
import { ModalController, IonRouterOutlet, NavController, IonTabs } from '@ionic/angular';
import { Observable, debounceTime, of , distinctUntilChanged, take, timer} from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { UserinfoService } from 'src/app/services/users/userinfo.service';
import Swiper from 'swiper';
import { ToastController } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-herb-home',
  templateUrl: './herb-home.page.html',
  styleUrls: ['./herb-home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HerbHomePage {

  user = this.userinfoservice.currentUserProfile$;
  public firstaid: Observable<HerbInfo[]>;
  public searchResults: Observable<HerbInfo[]>;
  public searchTerm: string = '';
  isAdmin: boolean = false;
  @ViewChild('swiperContainer') swiperContainer: any;
  @ViewChild(IonTabs) tabs: IonTabs; // Add this line to get a reference to IonTabs
  public loadingData: boolean = false;

  pictures = [ 
    { url : '/assets/backgrounds/herbs.jpg'},
    { url : '/assets/backgrounds/herbal1.jpg'},
    { url : '/assets/backgrounds/herbal2.jpg'},
    { url : '/assets/backgrounds/herbal3.jpg'},
  ]
  constructor(
    private dataService: HerbinfoService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private sanitizer:DomSanitizer,
    private authService : AuthService,
    private cdr : ChangeDetectorRef,
    private userinfoservice:UserinfoService,
    private toastController: ToastController,
    
  ) {
    this.firstaid = this.dataService.getHerbInfoAlphabetically();
  }

  onSearch() {
    
    const searchTermLower = this.searchTerm.trim().toLowerCase(); // Convert the search term to uppercase
    console.log('Search term:', searchTermLower);

    if (this.searchTerm.trim() !== '') {
      this.searchResults = this.dataService.searchHerbs(searchTermLower);
    } else {
      this.searchResults = null;
    }
  }


  async openNewModal() {
    const modal = await this.modalController.create({
      component: HerbCreatePage,
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }

   ngOnInit() {
    this.authService.isAdmin$
      .pipe(take(1))
      .subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });

      this.loadingData = true;
  
      this.dataService.getHerbInfoAlphabetically()
      .pipe(
        debounceTime(400),
      )
      .subscribe(firstaid => {
        this.firstaid = of(firstaid);
        timer(1000).subscribe(() => {
          this.loadingData = false;
          this.cdr.detectChanges();
        });
      });
  }
  

   doRefresh(event: any) {
    this.authService.isAdmin$;
    this.loadingData = true;
    this.dataService.getHerbInfoAlphabetically()
      .pipe(
        debounceTime(400),
      )
      .subscribe(firstaid => {
        this.firstaid = of(firstaid);
        timer(1000).subscribe(() => {
          this.loadingData = false;
          this.cdr.detectChanges();
          event.target.complete();
        });
      });
  }
  
  trackByInfo(index: number, item: HerbInfo): string {
    return item.id;
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Set the duration in milliseconds
      position: 'bottom', // Set the position
      color: 'success', // Set the color (optional)
    });
  
    toast.present();
  }
}
