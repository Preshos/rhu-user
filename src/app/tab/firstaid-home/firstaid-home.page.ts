
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirstAidInfo } from 'src/app/services/first-aid/firstaid';
import { FirstaidService } from 'src/app/services/first-aid/firstaid.service';
import { FirstaidCreatePage } from './../../pages/firstaid/firstaid-create/firstaid-create.page';


@Component({
  selector: 'app-firstaid-home',
  templateUrl: './firstaid-home.page.html',
  styleUrls: ['./firstaid-home.page.scss'],
})
export class FirstaidHomePage implements OnInit {

  public firstaid: Observable<FirstAidInfo[]>;
  public searchResults: Observable<FirstAidInfo[]>;
  public searchTerm: string = '';
  isAdmin: boolean;
  constructor(
    private infoService: FirstaidService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private sanitizer:DomSanitizer,
    private authService : AuthService
    
  ) {
    this.firstaid = this.infoService.getFirstAidInfoAlphabetically();
  }

  async openNewInfoModal() {
    const modal = await this.modalController.create({
      component: FirstaidCreatePage,
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }

  onSearch() {
    const searchTermLower = this.searchTerm.trim().toLowerCase(); 
    console.log('Search term:', searchTermLower);

    if (this.searchTerm.trim() !== '') {
      this.searchResults = this.infoService.search(searchTermLower);
    } else {
      this.searchResults = null;
    }
  }
  ngOnInit() {
    this.authService.isAdmin$
      .pipe(take(1))
      .subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });
  }

}
