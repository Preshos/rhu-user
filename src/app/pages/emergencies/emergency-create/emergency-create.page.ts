import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { EmergencyInfo } from 'src/app/services/emergency/emergency';
import { EmergenciesService } from 'src/app/services/emergency/emergencies.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { AnimationOptions } from 'ngx-lottie';
import Swiper from 'swiper';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-emergency-create',
  templateUrl: './emergency-create.page.html',
  styleUrls: ['./emergency-create.page.scss'],
})
export class EmergencyCreatePage implements OnInit {

  option: AnimationOptions = {path : 'assets/json/uploadfile.json'}
  public info:EmergencyInfo;
  createInfoForm: FormGroup;
  sub1: Subscription;
  selectedSegment: string = '1'; 
  isTouchingTextarea = false;
  touchStartX = 0;
  touchStartY = 0;

  @ViewChild('swiper') swiper?:ElementRef  <{swiper:Swiper}>;
  @ViewChild('createForm') createForm: FormGroupDirective;

  constructor(
    private modalController: ModalController,
    private infoService: EmergenciesService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.infoService.getEmergencyInfoById(id).subscribe(info => {
      if (!info) {
        this.router.navigate(['/home']);
      } else {
        this.info = info;
      }
    });

    this.createInfoForm = new FormGroup({
      'accidents': new FormControl('', Validators.required),
      'introduction': new FormControl('', Validators.required),
      'methods': new FormControl(''),
      'photourl': new FormControl('')
    });
  }
  dismissModal() {
    this.modalController.dismiss();
  }
  submitForm() {
    this.createForm.onSubmit(undefined);
  }

  createInfo(values: any) {

    values.accidents = values.accidents.toLowerCase();
    let newInfo: EmergencyInfo = { ...values };
    this.infoService.createEmergencyInfo(newInfo);
    this.dismissModal();
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
        allowEditing: false,
        resultType: CameraResultType.Uri, // Capture the image URI
        source: CameraSource.Prompt
      });
  
      
      const fileName = new Date().getTime() + '.jpg';
  
      // the storage path for the image
      const filePath = 'emergency_photos/' + fileName;
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
            this.createInfoForm.patchValue({ photourl: downloadURL });
          } catch (error) {
            console.error('Download URL error:', error);
          }
        });
    } catch (error) {
      console.error('Camera error:', error);
    }
  }
}
