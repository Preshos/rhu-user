
import { Component, OnInit } from '@angular/core';
import { 
  FormGroup,
  FormBuilder,
  Validators} from '@angular/forms';

import { Router } from '@angular/router';
import { ToastController , LoadingController,AlertController} from '@ionic/angular';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserinfoService } from 'src/app/services/users/userinfo.service';
import { AnimationOptions } from 'ngx-lottie';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  
  option: AnimationOptions = {path : 'assets/json/health.json'}
  logInForm: FormGroup;
  showpass:boolean = false;

  constructor(
    private authService : AuthService,
    private router: Router,
    private toast : ToastController,
    private userService: UserinfoService,
    private fb: FormBuilder,
    private load:LoadingController,
    private alert: AlertController,
    private toastcontrol:ToastController
  ) { }

  get email(){
    return this.logInForm.get('email');
  }

  get password(){
    return this.logInForm.get('password');
  }

  ngOnInit() {
    this.logInForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]],
    });

   
  }

  async login() {
    const loading = await this.load.create();
  
    const { email, password } = this.logInForm.value;
  
    await loading.present();
  
    if (!email || !password) {
      this.showAlert('Empty Fields', 'Please enter both email and password to log in.');
      await loading.dismiss();
      return;
    }

    if (!this.logInForm.valid) {
      this.showAlert('Invalid Input', 'Please enter a valid email and password.');
      await loading.dismiss();
      return;
    }
  
    this.authService
      .login(email, password)
      .pipe(
        switchMap(() => this.authService.currenUser$),
        catchError((error) => {
          if (error.code === 'auth/user-not-found') {
            // User not registered, show an alert
            this.showAlert('Login Failed', 'This email is not registered. Please sign up.');
            loading.dismiss();
          } else if (error.code === 'auth/wrong-password') {
            // Wrong password, show an alert
            this.showAlert('Login Failed', 'Invalid password. Please try again.');
            loading.dismiss();
          } else {
            console.error(error); // Log the error for debugging
          }
          return EMPTY; // Return an empty observable to stop the sequence
        }),
        tap(
          async (user) => {
            if (user) {
              // User exists, check email verification
              if (!user.emailVerified) {
                await this.authService.sendEmailVerification().toPromise();
                this.showAlert('Email is not Verified', 'Please check your email and click the verification link to log in.');
              } else {
                // Email is verified, proceed to the main content
                this.router.navigate(['/tabs/tabs/herb-home']);
              }
            } else {
              // Handle other cases if needed
            }
          },
          async () => {
            await loading.dismiss();
          }
        )
      )
      .subscribe(async () => {
        await loading.dismiss();
        this.logInForm.reset();
      });
  }

  toggleshow(){
		this.showpass = !this.showpass;
	}

  async showAlert(header, message) {
		const alert = await this.alert.create({
			header,
			message,
			buttons:['OK'],
      cssClass: 'custom-alert',

		});
		await alert.present();
	}
  
  signup(){
    this.router.navigate(['/signup']).then(() => {
      this.logInForm.reset();
    });
  }
}
