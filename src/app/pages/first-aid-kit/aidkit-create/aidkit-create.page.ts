import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { InfoService } from 'src/app/services/first-aid-kit/info.service';
import { FirstAidKitInfo } from 'src/app/services/first-aid-kit/aidkit';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { AnimationOptions } from 'ngx-lottie';
import Swiper from 'swiper';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-aidkit-create',
  templateUrl: './aidkit-create.page.html',
  styleUrls: ['./aidkit-create.page.scss'],
})
export class AidkitCreatePage implements OnInit {

  option: AnimationOptions = {path : 'assets/json/uploadfile.json'}
  public info:FirstAidKitInfo;
  createInfoForm: FormGroup;
  sub1: Subscription;
  selectedSegment: string = '1'; 
  isTouchingTextarea = false;
  touchStartX = 0;
  touchStartY = 0;
  selectedPhotoPath: string;
  
  @ViewChild('swiper') swiper?:ElementRef  <{swiper:Swiper}>;
  @ViewChild('createForm') createForm: FormGroupDirective;

  constructor(
    private modalController: ModalController,
    private infoService: InfoService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private loadingController:LoadingController,
  ) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.infoService.getFirstAidKitInfoById(id).subscribe(info => {
      if (!info) {
        this.router.navigate(['/home']);
      } else {
        this.info = info;
      }
    });

    this.createInfoForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'photourl': new FormControl('')
    });
  }
  dismissModal() {
    this.modalController.dismiss();
  }

  async submitForm() {
    const alert = await this.alertController.create({
      header: 'Confirm Submission',
      message: 'Create this info?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // clicked the "Cancel" button, do nothing
          },
        },
        {
          text: 'Create',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Creating...',
            });
            await loading.present();
            this.createForm.onSubmit(undefined);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await loading.dismiss();
          },
        },
      ],
      cssClass: 'custom-submit',
    });
  
    await alert.present();
  }

  createInfo(values: any) {
    // Check if a photo is selected
    if (this.selectedPhotoPath) {
      // Upload the selected photo to Firestore
      const fileName = new Date().getTime() + '.jpg';
      const filePath = 'firstaid_photos/' + fileName;
      const storage = getStorage();
      const storageRef = ref(storage, filePath);
  
      fetch(this.selectedPhotoPath)
        .then(response => response.blob())
        .then(blob => uploadBytes(storageRef, blob))
        .then(() => getDownloadURL(storageRef))
        .then(downloadURL => {
          // Update the form field or handle the download URL as needed
          values.photourl = downloadURL;
  
          values.name = values.name.toLowerCase();
          let newInfo: FirstAidKitInfo = { ...values };
          this.infoService.createFirstAidKitInfo(newInfo);
          this.dismissModal();
          console.log('Form Values:', values);
        })
        .catch(error => console.error('Error uploading photo:', error));
    } else {
      // Continue with creating without photo
      values.name = values.name.toLowerCase();
      let newInfo: FirstAidKitInfo = { ...values };
      this.infoService.createFirstAidKitInfo(newInfo);
      this.dismissModal();
    }   
  }
  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
  //for swiper config
  selectSegment(segment: number) {
    this.swiper.nativeElement.swiper.slideTo(segment - 1);
    this.selectedSegment = (this.swiper.nativeElement.swiper.activeIndex + 1).toString()
  }

  slideDidChange() {
    // console.log(this.swiper?.nativeElement.swiper.activeIndex);
    this.selectedSegment = (this.swiper.nativeElement.swiper.activeIndex + 1).toString();
  }
  onTouchStart(event: TouchEvent) {
    // Check if the touches array is defined and has at least one element
    if (event.touches && event.touches.length > 0) {
      // Store the initial touch position
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    }
    // Check if the touch event started in a textarea
    const target = event.target as HTMLElement;
    this.isTouchingTextarea = target.tagName.toLowerCase() === 'textarea';
  }
  onTouchMove(event: TouchEvent) {
    // Check if event.touches is defined and has at least one touch point
    if (event.touches && event.touches.length > 0) {
      // Store the touch position
      const touchX = event.touches[0].clientX;
      const touchY = event.touches[0].clientY;
  
      // Calculate the horizontal and vertical distances moved
      const deltaX = touchX - this.touchStartX;
      const deltaY = touchY - this.touchStartY;
  
      // Check if the horizontal distance moved is greater than the vertical distance moved
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe detected, handle it here
        // You can trigger the Swiper's horizontal swipe or other actions
  
        if (event.cancelable) {
          event.preventDefault();
        }
      } else {
        // Vertical swipe detected, you may want to handle it differently
        // Allow the default vertical touchmove behavior for scrolling in text areas
      }
    }
  }

  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.Uri, // Capture the image URI
        source: CameraSource.Prompt
      });
      

      // Update the selected photo path
      this.selectedPhotoPath = image.webPath;
      
      // Display the selected photo immediately
      this.displaySelectedPhoto(image.webPath);

      
      
    } catch (error) {
      console.error('Camera error:', error);
    }
  }
  // method to display the selected photo
  displaySelectedPhoto(photoPath: string) {
  this.selectedPhotoPath = photoPath;
}

}
