
import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FirstAidKitInfo } from 'src/app/services/first-aid-kit/aidkit';
import { InfoService } from 'src/app/services/first-aid-kit/info.service';
import { AidkitCreatePage } from 'src/app/pages/first-aid-kit/aidkit-create/aidkit-create.page';

@Component({
  selector: 'app-aidkit-home',
  templateUrl: './aidkit-home.page.html',
  styleUrls: ['./aidkit-home.page.scss'],
})
export class AidkitHomePage implements OnInit {

  public firstaid: Observable<FirstAidKitInfo[]>;
  public searchResults: Observable<FirstAidKitInfo[]>;
  public searchTerm: string = '';
  
  constructor(
    private infoService: InfoService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private sanitizer:DomSanitizer
    
  ) {
    this.firstaid = this.infoService.getFirstAidKitInfoAlphabetically();
  }

  async openNewInfoModal() {
    const modal = await this.modalController.create({
      component: AidkitCreatePage,
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }

  onSearch() {
    const searchTermLower = this.searchTerm.trim().toLowerCase(); // Convert the search term to uppercase
    console.log('Search term:', searchTermLower);

    if (this.searchTerm.trim() !== '') {
      this.searchResults = this.infoService.search(searchTermLower);
    } else {
      this.searchResults = null;
    }
  }

  ngOnInit() {
  }

}
