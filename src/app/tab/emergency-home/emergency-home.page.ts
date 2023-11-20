import { Component, OnInit ,ElementRef} from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { EmergenciesService } from 'src/app/services/emergency/emergencies.service';
import { EmergencyInfo } from 'src/app/services/emergency/emergency';
import { EmergencyCreatePage } from 'src/app/pages/emergencies/emergency-create/emergency-create.page';
@Component({
  selector: 'app-emergency-home',
  templateUrl: './emergency-home.page.html',
  styleUrls: ['./emergency-home.page.scss'],
})
export class EmergencyHomePage implements OnInit {

  public emergency: Observable<EmergencyInfo[]>;
  public searchResults: Observable<EmergencyInfo[]>;
  public searchTerm: string = '';
  isLoading: boolean = true;

  constructor(
    private elementRef: ElementRef,
    private infoService: EmergenciesService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private sanitizer:DomSanitizer
    
  ) {
    this.emergency = this.infoService.getEmergencyInfoAlphabetically();
  }

  async openNewInfoModal() {
    const modal = await this.modalController.create({
      component: EmergencyCreatePage,
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
    // // Access the ion-skeleton-text element by its ID
    // const skeletonLoadingElement: HTMLElement = this.elementRef.nativeElement.querySelector('#skeleton-loading');

    // // Show or hide the element based on the loading state
    // if (this.isLoading) {
    //   skeletonLoadingElement.style.display = 'block'; // Show the skeleton loading
    // } else {
    //   skeletonLoadingElement.style.display = 'none'; // Hide the skeleton loading
    // }

    // // Simulate data loading (replace this with actual data loading logic)
    // setTimeout(() => {
    //   this.isLoading = false; // Set to false when your data is ready
    //   // Hide the skeleton loading after data is ready
    //   skeletonLoadingElement.style.display = 'none';
    // }, 2000); // Replace 3000 with the actual loading time
  }

}
