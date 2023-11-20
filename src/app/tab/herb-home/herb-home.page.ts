import { Component, OnInit } from '@angular/core';
import { HerbInfo } from 'src/app/services/herbs/herb';
import { HerbinfoService } from 'src/app/services/herbs/herbinfo.service';
import { HerbCreatePage } from 'src/app/pages/herbs/herb-create/herb-create.page';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { Observable, debounceTime, of , distinctUntilChanged, take} from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { UserinfoService } from 'src/app/services/users/userinfo.service';
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
  isAdmin: boolean;
  constructor(
    private dataService: HerbinfoService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private sanitizer:DomSanitizer,
    private authService : AuthService,
    private cdr : ChangeDetectorRef,
    private userinfoservice:UserinfoService,
    
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

  async upload(){
    const image = await Camera.getPhoto({ 
     quality:90, 
     allowEditing: false, 
     resultType:CameraResultType.Uri,
     source: CameraSource.Photos
   });
    const imageUrl = image.webPath;
    document.getElementById('cameraImage').setAttribute('src',imageUrl);
   }

   ngOnInit() {
    this.authService.isAdmin$
      .pipe(take(1))
      .subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });
  }
  

   doRefresh(event: any) {
    this.dataService.getHerbInfoAlphabetically()
      .pipe(
        debounceTime(2000) // Adjust the time (in milliseconds) based on your requirements
      )
      .subscribe(herb => {
        this.firstaid = of(herb);
        this.cdr.detectChanges();
        event.target.complete();
      });
  }

}
