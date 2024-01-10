
import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { Observable, Subscription, catchError, debounceTime, of, switchMap, take, timer } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FirstAidKitInfo } from 'src/app/services/first-aid-kit/aidkit';
import { InfoService } from 'src/app/services/first-aid-kit/info.service';
import { AidkitCreatePage } from 'src/app/pages/first-aid-kit/aidkit-create/aidkit-create.page';
import { AuthService } from 'src/app/services/auth/auth.service';

import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-aidkit-home',
  templateUrl: './aidkit-home.page.html',
  styleUrls: ['./aidkit-home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AidkitHomePage implements OnInit {

  public firstaid: Observable<FirstAidKitInfo[]>;
  public searchResults: Observable<FirstAidKitInfo[]>;
  public searchTerm: string = '';
  isAdmin: boolean = false;
  public loadingData: boolean = false;


  public info: FirstAidKitInfo;
  sub1: Subscription;
  selectedFirstAidItem: any;
  pictures = [ 
    { url : '/assets/backgrounds/aid.jpg'},
    { url : '/assets/backgrounds/aid1.jpg'},
    { url : '/assets/backgrounds/aid2.jpg'},
    { url : '/assets/backgrounds/aid3.jpg'},
    { url : '/assets/backgrounds/aid4.jpg'},
  ]
  constructor(
    private infoService: InfoService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private sanitizer:DomSanitizer,
    private authService : AuthService,
    private cdr : ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private router: Router
  ) {
    this.firstaid = this.infoService.getFirstAidKitInfoAlphabetically();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.infoService.getFirstAidKitInfoById(id)
    .subscribe(info => {
      // if the contact doesn't exists, return to home page
      if (!info) {
        //do nothing
      } else {
        this.info = info;
      }
    });
  }

  
async openDetailsAlert(item: any) {
  this.selectedFirstAidItem = item; // Set the selected item

  const buttons: any[] = [
    {
      text: 'Close',
      role: 'cancel'
    }
  ];
  
  // Check if the user is an admin then show the edit 
  if (this.isAdmin) {
    buttons.unshift({
      text: 'Edit',
      handler: () => {
        // Navigate to the edit page when the "Edit" button is clicked
        this.router.navigate(['/aidkit-update', item.id]);
      }
    });
  }

  const alert = await this.alertController.create({
    message: `
      <div class="card-photo">
        <img src="${item.photourl}" alt="" >
      </div>
      <div class="card-name">${item.name}</div>
      <br>
      <div class="card-desc">${item.description}</div>
    `,
    buttons: buttons,
    cssClass: 'kit-alert'
  });

  await alert.present();

  // Handle the dismiss event to execute the handler function
  await alert.onDidDismiss();
}

   ngOnDestroy() {
    this.sub1.unsubscribe();
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
    this.authService.isAdmin$
      .pipe(take(1))
      .subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });
  
    this.loadingData = true;
  
    this.infoService.getFirstAidKitInfoAlphabetically()
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
    this.infoService.getFirstAidKitInfoAlphabetically()
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
