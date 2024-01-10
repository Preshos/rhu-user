import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NonNullableFormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription, debounceTime, switchMap, tap, timer } from 'rxjs';
import { UserinfoService } from 'src/app/services/users/userinfo.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileUser } from 'src/app/services/users/user';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { uploadBytes } from '@angular/fire/storage';
import { ChangeDetectorRef } from '@angular/core';

@UntilDestroy()
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.page.html',
  styleUrls: ['./user-update.page.scss'],
})
export class UserUpdatePage implements OnInit {
  
  public user : ProfileUser;
  sub1: Subscription;
  sub2: Subscription;
  updateInfoForm: FormGroup;
  formIsEdited: boolean = false;
  isAdmin: boolean;
  selectedPhotoPath: string;
  

  //to make the form not null
  profileForm = this.fb.group({
    uid: [''],
    firstname: [''] , 
    midname: [''],
    lastname: [''],
    age: [],
    phone: [],
    email: [''],
    gender: [''],
    street: [''],
    city: [''],
    brgy: [''],
    province: [''],
    password:[''],
    photourl:['']
  }); 

  @ViewChild('updateForm') updateForm: FormGroupDirective;
  @ViewChild('dynamicText', { read: ElementRef }) dynamicText: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
    private userservice : UserinfoService,
    private router : Router,
    private alertController: AlertController,
    private loadingController:LoadingController,
    private fb: NonNullableFormBuilder,
    private toastcontrol:ToastController,
    private auth:AuthService,
    private cdr : ChangeDetectorRef,
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
      // Subscribe to getFirstAidherbById
      this.sub1 = this.userservice.getUserById(id).subscribe(user => {
        if (!user) {
          this.router.navigate(['/home']);
        } else {
          this.user = user;

        // this.updateInfoForm = new FormGroup({
        //   'uid':  (this.user.uid),
        //   'firstname': (this.user.firstname) , 
        //   'midname':(this.user.midname),
        //   'lastname':(this.user.lastname),
        //   'age':(this.user.age),
        //   'phone':(this.user.phone),
        //   'email': (this.user.email),
        //   'gender':(this.user.gender),
        //   'street':(this.user.street),
        //   'city':(this.user.city),
        //   'brgy':(this.user.brgy),
        //   'province':(this.user.province),

        // });

        // this.sub2 = this.updateInfoForm.valueChanges.subscribe(values => {
        //   this.formIsEdited = true;
        // })
        }
    });

    this.userservice.currentUserProfile$
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });

    this.auth.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

}

updateInfo(values: any) {
  const { uid, ...data  } = this.profileForm.value;

  const profileForm: ProfileUser = { uid: this.user?.uid, ...data };

  // Set isAdmin to true for the current user
  if (this.user.isAdmin) {
    profileForm.isAdmin = true;
  } else {
    profileForm.isAdmin = false;
  }

  // Set isOnline to true for the current user
  profileForm.isOnline = true;

  this.userservice.updateUser({ uid, ...data });
}

async submitForm() {
  const { uid, ...data } = this.profileForm.value;
  if (!uid) {
    return;
  }

  // Create a copy of the form data to prevent modifications before confirmation
  const profileForm: ProfileUser = { uid: this.user?.uid, ...data };

  // Set isAdmin to true for the current user
  profileForm.isAdmin = this.user.isAdmin;

  const alert = await this.alertController.create({
    header: 'Confirm Update',
    message: 'Are you sure you want to update this?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          // User clicked the "Cancel" button, do nothing
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
            if (this.selectedPhotoPath) {
              // Upload the selected photo to Firestore
              const fileName = new Date().getTime() + '.jpg';
              const filePath = 'user_photos/' + fileName;
              const storage = getStorage();
              const storageRef = ref(storage, filePath);

              const response = await fetch(this.selectedPhotoPath);
              const blob = await response.blob();
              await uploadBytes(storageRef, blob);

              // Get the download URL of the uploaded photo
              const downloadURL = await getDownloadURL(storageRef);

              // Update the profile form with the photo URL
              profileForm.photourl = downloadURL;

              console.log('Photo uploaded. Form data with photo:', profileForm);
            } else {
              console.log('No photo selected. Form data without photo:', profileForm);
            }

            // Update the user in Firestore
            await this.userservice.updateUser(profileForm);

            console.log('User updated successfully:', profileForm);

            // Navigate to the user home page
            this.router.navigate(['/tabs/tabs/user-home']);
          } catch (error) {
            console.error('Update failed:', error);
          } finally {
            await loading.dismiss();
          }
        }
      }
    ],
    cssClass: 'custom-logout',
  });

  await alert.present();
}

back(){
  this.router.navigate(['tabs/tabs/user-home']).then(()=>{
    this.displaySelectedPhoto(''),
    this.profileForm;
  });

}

async openCamera() {
  try {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt
    });

    // Update the selected photo path
    this.selectedPhotoPath = image.webPath;

    // Display the selected photo immediately
    this.displaySelectedPhoto(this.selectedPhotoPath);
    
  } catch (error) {
    console.error('Camera error:', error);
  }
}


// Add a method to display the selected photo
displaySelectedPhoto(photoPath: string) {
  this.selectedPhotoPath = photoPath;
}

doRefresh(event: any) {

  this.userservice.currentUserProfile$
    .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
        timer(500).subscribe(() => {
          this.cdr.detectChanges();
          event.target.complete();
        });
      });
  }
}



