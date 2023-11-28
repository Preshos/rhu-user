import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
import { AlertController,LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-aidkit-update',
  templateUrl: './aidkit-update.page.html',
  styleUrls: ['./aidkit-update.page.scss'],
})
export class AidkitUpdatePage implements OnInit {

  option: AnimationOptions = {path : 'assets/json/uploadfile.json'}
  public info:FirstAidKitInfo;
  updateInfoForm: FormGroup;
  formIsEdited: boolean = false;
  sub1: Subscription;
  sub2: Subscription;
  selectedSegment: string = '1'; 
  isTouchingTextarea = false;
  touchStartX = 0;
  touchStartY = 0;

  @ViewChild('swiper') swiper?:ElementRef  <{swiper:Swiper}>;
  @ViewChild('updateForm') updateForm: FormGroupDirective;

  constructor(
    private infoService: InfoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private loadingController:LoadingController,
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.sub1 = this.infoService.getFirstAidKitInfoById(id)
    .subscribe(info => {
      if (!info) {
        this.router.navigate(['/tabs/tabs/aidkit-home']);
      } else {
        this.info = info;

        this.updateInfoForm = new FormGroup({
          'name': new FormControl(this.info.name),
          'description': new FormControl(this.info.description),
          'photourl': new FormControl(this.info.photourl)
        });

        this.sub2 = this.updateInfoForm.valueChanges.subscribe(values => {
          this.formIsEdited = true;
        })
      }
    });
  }
  cancel(){
    this.router.navigate(['/tabs/tabs/aidkit-home']);
  }
  
  async submitForm() {
    const alert = await this.alertController.create({
      header: 'Confirm Update',
      message: 'Are you sure you want to update this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // clicked the "Cancel" button, do nothing
          }
        },
        {
          text: 'Update',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Updating...',
            });

            await loading.present();

            try {
              this.updateForm.onSubmit(undefined);
              await new Promise((resolve) => setTimeout(resolve, 500));
              await loading.dismiss();
              this.router.navigate(['/tabs/tabs/aidkit-home']);//'/aidkit-details', this.info.id

            } catch (error) {
              console.error('Update failed:', error);
              await loading.dismiss();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  updateInfo(values: any) {
    values.name = values.name.toLowerCase();
    // copy all the form values into the Info to be updated
    let updatedInfo: FirstAidKitInfo = { id: this.info.id, ...values };
    this.infoService.updateFirstAidKitInfo(updatedInfo);
  }

  async deleteInfo(infoId: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // User clicked the "Cancel" button, do nothing
          }
        },
        {
          text: 'Delete',
          handler: () => {
            // User clicked the "Delete" button, proceed with deletion
            this.infoService.deleteFirstAidKitInfo(infoId).then(
              res => this.router.navigate(['/tabs/tabs/aidkit-home'])
            );
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri, // Capture the image URI
        source: CameraSource.Prompt
      });
  
      
      const fileName = new Date().getTime() + '.jpg';
  
      // the storage path for the image
      const filePath = 'aidkit_photos/' + fileName;
      const storage = getStorage();
      const storageRef = ref(storage, filePath);
  
      // Create a blob from the image URI
      const response = await fetch(image.webPath);
      const blob = await response.blob();
  
      // Upload the image blob to Firebase Storage
      const uploadTask = uploadBytes(storageRef, blob);
  
      uploadTask
        .then((snapshot) => {
          // Image uploaded successfully
        })
        .catch((error) => {
          console.error('Image upload error:', error);
        })
        .then(async () => {
          try {
            // Upload complete
            const downloadURL = await getDownloadURL(storageRef);
            // Update your form field or handle the download URL as needed
            this.updateInfoForm.patchValue({ photourl: downloadURL });
          } catch (error) {
            console.error('Download URL error:', error);
          }
        });
    } catch (error) {
      console.error('Camera error:', error);
    }
  }
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
      if (event.cancelable) {
        event.preventDefault();
      }
    }
  }
}
}
