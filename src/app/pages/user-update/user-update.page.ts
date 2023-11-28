import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NonNullableFormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription, switchMap, tap } from 'rxjs';
import { UserinfoService } from 'src/app/services/users/userinfo.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileUser } from 'src/app/services/users/user';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { uploadBytes } from '@angular/fire/storage';
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

  profileForm = this.fb.group({
    uid: [''],
    firstname: [''] , 
    midname: [''],
    lastname: [''],
    age: [''],
    phone: [''],
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

  constructor(private activatedRoute: ActivatedRoute,
    private userservice : UserinfoService,
    private router : Router,
    private alertController: AlertController,
    private loadingController:LoadingController,
    private fb: NonNullableFormBuilder,
    private toastcontrol:ToastController,
    private auth:AuthService
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
  const { uid, ...data  } = this.profileForm.value;
  if (!uid){
    return;
  }
  const profileForm: ProfileUser = { uid: this.user?.uid, ...data };

  // Set isAdmin to true for the current user
  if (this.user.isAdmin) {
    profileForm.isAdmin = true;
  } else {
    profileForm.isAdmin = false;
  }
  
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
            this.userservice.updateUser(profileForm);
            await new Promise((resolve) => setTimeout(resolve, 500));
            await loading.dismiss();
            this.router.navigate(['/tabs/tabs/user-home']);

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


back(){
  this.router.navigate(['tabs/tabs/user-home'])
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
    const filePath = 'user_photos/' + fileName;
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
          this.profileForm.patchValue({ photourl: downloadURL });
        } catch (error) {
          console.error('Download URL error:', error);
        }
      });
  } catch (error) {
    console.error('Camera error:', error);
  }
}
}
