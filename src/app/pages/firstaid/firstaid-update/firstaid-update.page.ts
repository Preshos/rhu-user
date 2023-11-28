import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormArray } from '@angular/forms';
import { FirstAidInfo } from 'src/app/services/first-aid/firstaid';
import { FirstaidService } from 'src/app/services/first-aid/firstaid.service';
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
  selector: 'app-firstaid-update',
  templateUrl: './firstaid-update.page.html',
  styleUrls: ['./firstaid-update.page.scss'],
})
export class FirstaidUpdatePage implements OnInit {

  option: AnimationOptions = {path : 'assets/json/uploadfile.json'}
  public info:FirstAidInfo;
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
    private infoService: FirstaidService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private loadingController:LoadingController,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
  
    // Initialize the form first
    this.updateInfoForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'photourl': new FormControl(''),
      'description': new FormArray([]),
      'introduction': new FormControl(''),
      'content': new FormControl(''),
      'cause': new FormControl(''),
      // add more fields here 
    });
  
    // Subscribe to getFirstAidInfoById
    this.sub1 = this.infoService.getFirstAidInfoById(id).subscribe(info => {
      if (!info) {
        this.router.navigate(['/home']);
      } else {
        this.info = info;
  
        // Initialize the description FormArray with existing values
        const descriptionArray = this.updateInfoForm.get('description') as FormArray;
        if (this.info.description) {
          this.info.description.forEach((desc: any) => {
            descriptionArray.push(
              new FormGroup({
                'content': new FormControl(desc.content),
                // add more fields here
              })
            );
          });
        }
       
  
        // Set values for other form controls
        this.updateInfoForm.patchValue({
          'name': this.info.name,
          'photourl': this.info.photourl,
          'introduction':this.info.introduction,
          'cause': this.info.cause
          // add more fields here 
        });
      }
    });
  }
  

  cancel(){
    this.router.navigate(['/firstaid-details', this.info.id]);
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
              this.addDescription();
              this.updateForm.onSubmit(undefined);
              await new Promise((resolve) => setTimeout(resolve, 500));
              await loading.dismiss();
              this.router.navigate(['/firstaid-details', this.info.id]);

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

  updateInfo(values:any) {
    values.name = values.name.toLowerCase();
    // Extract description from the FormArray
    const description = this.updateInfoForm.value.description.map((desc: any) => ({
      content: desc.content
      //add
    }));
  
    // Create the FirstAidInfo object with the 'id'
    let updatedInfo: FirstAidInfo = {
      id: this.info.id,
      name: this.updateInfoForm.value.name,
      description: description,
      photourl: this.updateInfoForm.value.photourl,
      introduction:this.updateInfoForm.value.introduction,
      cause:this.updateInfoForm.value.cause
    };
  
    // Call the service to updateFirstAidInfo
    this.infoService.updateFirstAidInfo(updatedInfo).then(() => {
      console.log('Info updated successfully.');  // Optional: Add a success log
    })
    .catch(error => console.error('Error updating info:', error));
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
            this.infoService.deleteFirstAidInfo(infoId).then(
              res => this.router.navigate(['/tabs/tabs/firstaid-home'])
            );
          }
        }
      ]
    });
    await alert.present();
  }
  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  
    if (this.sub2) {
      this.sub2.unsubscribe();
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

addDescription() {
  const descriptionArray = this.updateInfoForm.get('description') as FormArray;

  
  const contentValue = this.updateInfoForm.get('content').value;

  if ( contentValue){
    descriptionArray.push(
      new FormGroup({
        
        'content': new FormControl(contentValue)
        //add more fields here
      })
    );
  }
  // Add a new FormGroup to the FormArray with the values from the main form
  
    // Reset the values of title and content in the main form(can add more fields)
    this.updateInfoForm.patchValue({
      'content': ''
    });

  console.log(this.updateInfoForm.value);
  
}


get descriptionControls() {
  return (this.updateInfoForm.get('description') as FormArray).controls as FormGroup[];
}
 // Delete a 'use' at the specified index
 deletedesc(index: number) {
  const usesArray = this.updateInfoForm.get('description') as FormArray;

  if (index >= 0 && index < usesArray.length) {
    usesArray.removeAt(index);
  }
}
}
