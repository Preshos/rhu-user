import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormArray } from '@angular/forms';
import { FirstAidInfo } from 'src/app/services/first-aid/firstaid';
import { FirstaidService } from 'src/app/services/first-aid/firstaid.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AnimationOptions } from 'ngx-lottie';
import Swiper from 'swiper';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-firstaid-create',
  templateUrl: './firstaid-create.page.html',
  styleUrls: ['./firstaid-create.page.scss'],
})
export class FirstaidCreatePage implements OnInit {

  option: AnimationOptions = { path : 'assets/json/uploadfile.json'}
  public info: FirstAidInfo;
  createInfoForm: FormGroup;
  sub1: Subscription;
  selectedSegment: string = '1'; 
  isTouchingTextarea = false;
  touchStartX = 0;
  touchStartY = 0;
  selectedPhotoPath: string;

  @ViewChild('swiper') swiper?: ElementRef<{swiper: Swiper}>;
  @ViewChild('createForm') createForm: FormGroupDirective;

  constructor(
    private modalController: ModalController,
    private infoService: FirstaidService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private loadingController:LoadingController,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.infoService.getFirstAidInfoById(id).subscribe(info => {
      if (!info) {
        this.router.navigate(['/home']);
      } else {
        this.info = info;
      }
    });

    this.createInfoForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'photourl': new FormControl(''),
      'description': new FormArray([]),
      'title': new FormControl(''),
      'content': new FormControl(''),
      'introduction': new FormControl(''),
      'cause': new FormControl(''),
      // add more fields here 
    });
  }
  
  addDescription() {
    const descriptionArray = this.createInfoForm.get('description') as FormArray;
  
    
    const contentValue = this.createInfoForm.get('content').value;
  
    if (contentValue){
// Add a new FormGroup to the FormArray with the values from the main form
descriptionArray.push(
  new FormGroup({
    'content': new FormControl(contentValue)
    //add more fields here
  })
);
    }
    
      // Reset the values of title and content in the main form(can add more fields)
      this.createInfoForm.patchValue({
        'content': ''
      });

    console.log(this.createInfoForm.value);
    
  }
 
  
  get descriptionControls() {
    return (this.createInfoForm.get('description') as FormArray).controls as FormGroup[];
  }
  dismissModal() {
    this.modalController.dismiss();
  }

  async submitForm() {
    const alert = await this.alertController.create({
      header: 'Confirm Submission',
      message: 'Create this herb info?',
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
            this.addDescription();
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

    const description = values.description.map((desc: any) => ({
      content: desc.content
    }));

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
  
          // Continue with creating 
          this.continueCreateInfo(values);
          console.log('Form Values:', values);
        })
        .catch(error => console.error('Error uploading photo:', error));
    } else {
      // Continue with creating without photo
      this.continueCreateInfo(values);
    }
  }

  // createInfo(values: any) {
  //   values.name = values.name.toLowerCase();
  //   console.log('Form Values:', values);
  //   // Extract description from the FormArray
    
  //   const description = values.description.map((desc: any) => ({
  //     content: desc.content
  //   }));
    
  //   // Create the FirstAidInfo object without the 'id'
  //   let newInfo: Omit<FirstAidInfo, 'id'> = {
  //     name: values.name,
  //     description: description,
  //     photourl: values.photourl,
  //     introduction:values.introduction,
  //     cause: values.cause
  //   };
  
  //   // Call the service to createFirstAidInfo
  //   this.infoService.createFirstAidInfo(newInfo).then(() => {
  //     console.log('Info created successfully.');  // Optional: Add a success log
  //     this.dismissModal();
  //   })
  //   .catch(error => console.error('Error creating info:', error));
  // }
  
  private continueCreateInfo(values: any) {
    values.name = values.name.toLowerCase();
    
    // Create the FirstAidInfo object without the 'id'
    let newInfo: Omit<FirstAidInfo, 'id'> = {
      name: values.name,
      description: values.description,
      photourl: values.photourl,
      introduction:values.introduction,
      cause: values.cause
    };
    // Call the service to createFirstAidInfo
    this.infoService.createFirstAidInfo(newInfo).then(() => {
      console.log('Info created successfully.');  // Optional: Add a success log
      this.dismissModal();
    })
    .catch(error => console.error('Error creating info:', error));
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  // for swiper config
  selectSegment(segment: number) {
    this.swiper.nativeElement.swiper.slideTo(segment - 1);
    this.selectedSegment = (this.swiper.nativeElement.swiper.activeIndex + 1).toString()
  }

  slideDidChange() {
    this.selectedSegment = (this.swiper.nativeElement.swiper.activeIndex + 1).toString();
  }

  onTouchStart(event: TouchEvent) {
    if (event.touches && event.touches.length > 0) {
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    }
    const target = event.target as HTMLElement;
    this.isTouchingTextarea = target.tagName.toLowerCase() === 'textarea';
  }

  onTouchMove(event: TouchEvent) {
    if (event.touches && event.touches.length > 0) {
      const touchX = event.touches[0].clientX;
      const touchY = event.touches[0].clientY;
      const deltaX = touchX - this.touchStartX;
      const deltaY = touchY - this.touchStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (event.cancelable) {
          event.preventDefault();
        }
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

  // async openCamera() {
  //   try {
  //     const image = await Camera.getPhoto({
  //       quality: 100,
  //       allowEditing: false,
  //       resultType: CameraResultType.Uri,
  //       source: CameraSource.Prompt
  //     });

  //     // Display the selected photo immediately
  //     this.displaySelectedPhoto(image.webPath);


  //     const fileName = new Date().getTime() + '.jpg';
  //     const filePath = 'firstaid_photos/' + fileName;
  //     const storage = getStorage();
  //     const storageRef = ref(storage, filePath);

  //     const response = await fetch(image.webPath);
  //     const blob = await response.blob();

  //     const uploadTask = uploadBytes(storageRef, blob);

  //     uploadTask
  //       .then((snapshot) => {})
  //       .catch((error) => {
  //         console.error('Image upload error:', error);
  //       })
  //       .then(async () => {
  //         try {
  //           const downloadURL = await getDownloadURL(storageRef);
  //           this.createInfoForm.patchValue({ photourl: downloadURL });
  //         } catch (error) {
  //           console.error('Download URL error:', error);
  //         }
  //       });
  //   } catch (error) {
  //     console.error('Camera error:', error);
  //   }
  // }
  
// method to display the selected photo
displaySelectedPhoto(photoPath: string) {
  this.selectedPhotoPath = photoPath;
}

}
