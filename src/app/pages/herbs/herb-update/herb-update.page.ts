import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HerbinfoService } from 'src/app/services/herbs/herbinfo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HerbInfo } from 'src/app/services/herbs/herb';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormArray } from '@angular/forms';
import { Subscription, finalize, switchMap } from 'rxjs';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AnimationOptions } from 'ngx-lottie';
import { AlertController,LoadingController } from '@ionic/angular';
import Swiper from 'swiper';
import { uploadBytes } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-herb-update',
  templateUrl: './herb-update.page.html',
  styleUrls: ['./herb-update.page.scss'],
})
export class HerbUpdatePage implements OnInit, OnDestroy {

  public herb:HerbInfo;
  updateHerbForm: FormGroup;
  formIsEdited: boolean = false;
  sub1: Subscription;
  sub2: Subscription;
  selectedSegment: string = '1'; 
  isTouchingTextarea = false;
  touchStartX = 0;
  touchStartY = 0;

  option: AnimationOptions = {
    path : 'assets/json/uploadfile.json',
  }

  @ViewChild('updateForm') updateForm: FormGroupDirective;
  @ViewChild('swiper') swiper?:ElementRef  <{swiper:Swiper}>;
  
  constructor(
    private dataService: HerbinfoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private loadingController:LoadingController,
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.sub1 = this.dataService.getHerbInfoById(id)
    .subscribe(herb => {
      if (!herb) {
        this.router.navigate(['/tabs/tabs/herb-home']);
      } else {
        this.herb = herb;

        this.updateHerbForm = new FormGroup({
          'herbname': new FormControl(this.herb.herbname),
          'description': new FormControl(this.herb.description),
          'uses': new FormControl(this.herb.uses),
          'scientificname': new FormControl(this.herb.scientificname),
          'photourl': new FormControl(this.herb.photourl),
          'desc': new FormControl(''),
          'title_desc': new FormControl(''),
          'precautions': new FormArray([]),
          'title': new FormArray([]),
        });

        this.getcurrentdata(this.herb.precautions,this.herb.title);

        this.sub2 = this.updateHerbForm.valueChanges.subscribe(values => {
          this.formIsEdited = true;
        })
      }
    });
  }

 
  cancel(){
    this.router.navigate(['/herb-details', this.herb.id]);
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
              this.addPrecaution();
              // This will show the updated info
              console.log(this.updateHerbForm.value);
              this.updateForm.onSubmit(undefined);
              await new Promise((resolve) => setTimeout(resolve, 500));
              await loading.dismiss();
              this.router.navigate(['/herb-details', this.herb.id]);
  
            } catch (error) {
              console.error('Update failed:', error);
              await loading.dismiss();
            }
          }
        }
      ],
      cssClass: 'custom-submit'
    });
    await alert.present();
  }
  

  updateInfo(values: any) {
    // convert the updated name into lowercase
    values.herbname = values.herbname.toLowerCase();
    // copy all the form values to be updated
    let updatedInfo: HerbInfo = { id: this.herb.id, ...values };
    this.dataService.updateHerbInfo(updatedInfo);
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
            this.dataService.deleteHerbInfo(infoId).then(
              res => this.router.navigate(['/tabs/tabs/herb-home'])
            );
          }
        }
      ],
      cssClass: 'custom-submit'
    });
    await alert.present();
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
  
  
  onPhotoSelected(event: any) {
    const storage = getStorage();
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const filePath = `herb_photos/${file.name}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed',
        (snapshot) => {
          // Handle upload progress
        },
        (error) => {
          // Handle upload error
        },
        () => {
          // Upload complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.updateHerbForm.patchValue({ photourl: downloadURL });
          });
        }
      );
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
      const filePath = 'herb_photos/' + fileName;
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
            this.updateHerbForm.patchValue({ photourl: downloadURL });
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

addPrecaution() {
  const desc = this.updateHerbForm.get('desc').value;
  const title_desc = this.updateHerbForm.get('title_desc').value;

  if (desc.trim() !== '' && title_desc.trim() !== '') {
    const titleFormArray = this.updateHerbForm.get('title') as FormArray;
    titleFormArray.push(new FormControl('')); // Push a new FormControl first
    titleFormArray.at(titleFormArray.length - 1).setValue(title_desc); // Set the value
  
    
    const precautionsFormArray = this.updateHerbForm.get('precautions') as FormArray;
    precautionsFormArray.push(new FormControl('')); // Push a new FormControl first
    precautionsFormArray.at(precautionsFormArray.length - 1).setValue(desc); // Set the value

    this.updateHerbForm.get('desc').setValue('');
    this.updateHerbForm.get('title_desc').setValue('');
    
  }
}

  getcurrentdata(precautions: string[] , title:string[]) {

    const titleFormArray = this.updateHerbForm.get('title') as FormArray;
    title.forEach((title) => {
      titleFormArray.push(new FormControl(title));
      
    });

    const precautionsFormArray = this.updateHerbForm.get('precautions') as FormArray;
    precautions.forEach((precaution) => {
      precautionsFormArray.push(new FormControl(precaution));
    });
  }

  deletePrecaution(index: number) {
    const precautions = this.updateHerbForm.get('precautions') as FormArray;
    console.log('Precautions Length:', precautions.length);
    
    if (index >= 0 && index < precautions.length) {
      precautions.removeAt(index);
  
      const title = this.updateHerbForm.get('title') as FormArray;
      console.log('Title Length:', title.length);
      if (index < title.length) {
        title.removeAt(index);
      }
    }
  }
  
}
