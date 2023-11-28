import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  @ViewChild('swiper') swiper?: ElementRef<{swiper: Swiper}>;
  @ViewChild('createForm') createForm: FormGroupDirective;

  constructor(
    private modalController: ModalController,
    private infoService: FirstaidService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private actionSheetController: ActionSheetController
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

  submitForm() {
    this.addDescription();
    this.createForm.onSubmit(undefined);
  }
  

  createInfo(values: any) {
    values.name = values.name.toLowerCase();
    console.log('Form Values:', values);
    // Extract description from the FormArray
    
    const description = values.description.map((desc: any) => ({
      content: desc.content
    }));
    
    // Create the FirstAidInfo object without the 'id'
    let newInfo: Omit<FirstAidInfo, 'id'> = {
      name: values.name,
      description: description,
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
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });

      const fileName = new Date().getTime() + '.jpg';
      const filePath = 'firstaid_photos/' + fileName;
      const storage = getStorage();
      const storageRef = ref(storage, filePath);

      const response = await fetch(image.webPath);
      const blob = await response.blob();

      const uploadTask = uploadBytes(storageRef, blob);

      uploadTask
        .then((snapshot) => {})
        .catch((error) => {
          console.error('Image upload error:', error);
        })
        .then(async () => {
          try {
            const downloadURL = await getDownloadURL(storageRef);
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
