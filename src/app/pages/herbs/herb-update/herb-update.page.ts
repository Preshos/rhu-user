import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { HerbinfoService } from 'src/app/services/herbs/herbinfo.service';
import { ActionSheetController } from '@ionic/angular';
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
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
  
    // Initialize the form first
    this.updateHerbForm = new FormGroup({
      'herbname': new FormControl('', Validators.required),
      'other_name': new FormControl(''),
      'photourl': new FormControl(''),
      'description':new FormControl(''),
      'title': new FormControl(''),
      'content': new FormControl(''),
      'uses': new FormArray([]),
      'benefits':new FormControl(''),
      'beware':new FormControl(''),
      'procedure': new FormControl ('')
      // add more fields here 
    });
  
    // Subscribe to getFirstAidherbById
    this.sub1 = this.dataService.getHerbInfoById(id).subscribe(herb => {
      if (!herb) {
        this.router.navigate(['/home']);
      } else {
        this.herb = herb;
  
        // Initialize the description FormArray with existing values
        const descriptionArray = this.updateHerbForm.get('uses') as FormArray;
         // Check if 'herb.uses' is defined before iterating
    if (this.herb.uses) {
      this.herb.uses.forEach((desc: any) => {
        descriptionArray.push(
          new FormGroup({
            'title': new FormControl(desc.title),
            'content': new FormControl(desc.content),
            'procedure': new FormControl(desc.procedure),
            // add more fields here
          })
        );
      });
    }
  
        // Set values for other form controls
        this.updateHerbForm.patchValue({
          'herbname': this.herb.herbname,
          'photourl': this.herb.photourl,
          'description': this.herb.description,
          'benefits': this.herb.benefits,
          'other_name':this.herb.other_name,
          'beware': this.herb.beware,
          // add more fields here 
        });
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
              this.addDescription();
            
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
    values.herbname = values.herbname.toLowerCase();
    // Extract description from the FormArray
    const uses = this.updateHerbForm.value.uses.map((desc: any) => ({
      title: desc.title,
      content: desc.content,
      procedure:desc.procedure
      //add
    }));
  
    // Create the FirstAidInfo object with the 'id'
    let updatedInfo: HerbInfo = {
      id: this.herb.id,
      herbname: this.updateHerbForm.value.herbname,
      description: this.updateHerbForm.value.description,
      photourl: this.updateHerbForm.value.photourl,
      benefits: this.updateHerbForm.value.benefits,
      other_name: this.updateHerbForm.value.other_name,
      beware: this.updateHerbForm.value.beware,
      uses:uses 
    };
  
    // Call the service to updateFirstAidInfo
    this.dataService.updateHerbInfo(updatedInfo).then(() => {
      console.log('Info updated successfully.');  // Optional: Add a success log
    })
    .catch(error => console.error('Error updating info:', error));
  }

 async deleteherb(herbId: string) {
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
            this.dataService.deleteHerbInfo(herbId).then(
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
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  
    // Remove the following block if not needed
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
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

addDescription() {
  const descriptionArray = this.updateHerbForm.get('uses') as FormArray;

  // get the values from the main form
  const titleValue = this.updateHerbForm.get('title').value;
  const contentValue = this.updateHerbForm.get('content').value;
  const procedureValue = this.updateHerbForm.get('procedure').value;

  // Check if both title and content values are not empty
  if (titleValue && contentValue) {
    // Add a new FormGroup to the FormArray with the values from the main form
    descriptionArray.push(
      new FormGroup({
        'title': new FormControl(titleValue),
        'content': new FormControl(contentValue),
        'procedure': new FormControl(procedureValue)
        //add more fields here
      })
    );

    // Reset the values of title and content in the main form (can add more fields)
    this.updateHerbForm.patchValue({
      'title': '',
      'content': '',
      'procedure': ''
    });
  }
}



get descriptionControls() {
  return (this.updateHerbForm.get('uses') as FormArray).controls as FormGroup[];
}

  // Delete a 'use' at the specified index
deleteDesc(index: number) {
  const usesArray = this.updateHerbForm.get('uses') as FormArray;

  if (index >= 0 && index < usesArray.length) {
    usesArray.removeAt(index);
  }
}

async deleteAction(index: number) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Confirm Deletion',
    buttons: [
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteDesc(index);
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
        icon: 'close',
      },
    ],
  });

  await actionSheet.present();
}
  
}
