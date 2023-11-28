
import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { Observable, debounceTime, of, take, timer } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FirstAidInfo } from 'src/app/services/first-aid/firstaid';
import { FirstaidService } from 'src/app/services/first-aid/firstaid.service';
import { FirstaidCreatePage } from './../../pages/firstaid/firstaid-create/firstaid-create.page';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-firstaid-home',
  templateUrl: './firstaid-home.page.html',
  styleUrls: ['./firstaid-home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstaidHomePage implements OnInit {


  pictures = [ 
    { url : '/assets/backgrounds/aid.jpg'},
    { url : '/assets/backgrounds/aid1.jpg'},
    { url : '/assets/backgrounds/aid2.jpg'},
    { url : '/assets/backgrounds/aid3.jpg'},
  ]

  public loadingData: boolean = false;
  public firstaid: Observable<FirstAidInfo[]>;
  public searchResults: Observable<FirstAidInfo[]>;
  public searchTerm: string = '';
  isAdmin:boolean;
  constructor(
    private infoService: FirstaidService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private sanitizer:DomSanitizer,
    private authService : AuthService,
    private cdr : ChangeDetectorRef,
    
  ) {
    this.firstaid = this.infoService.getFirstAidInfoAlphabetically();
  }

  async openNewModal() {
    const modal = await this.modalController.create({
      component: FirstaidCreatePage,
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
    this.authService.isAdmin$
      .pipe(take(1))
      .subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });
      this.loadingData = true;
  

    this.infoService.getFirstAidInfoAlphabetically()
      .pipe(
        debounceTime(400),
      )
      .subscribe(firstaid => {
        this.firstaid = of(firstaid);
        timer(500).subscribe(() => {
          this.loadingData = false;
          this.cdr.detectChanges();
        });
      });
  }

  doRefresh(event: any) {
    this.loadingData = true;
    this.infoService.getFirstAidInfoAlphabetically()
      .pipe(
        debounceTime(400),
      )
      .subscribe(firstaid => {
        this.firstaid = of(firstaid);
        timer(500).subscribe(() => {
          this.loadingData = false;
          this.cdr.detectChanges();
          event.target.complete();
        });
      });
  }

}
