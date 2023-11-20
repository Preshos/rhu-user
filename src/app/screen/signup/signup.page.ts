
import { Component, OnInit } from '@angular/core';
import { 
  AbstractControl,
  FormControl,
  FormGroup,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators} from '@angular/forms';

import { Router } from '@angular/router';
import { ToastController , LoadingController,AlertController} from '@ionic/angular';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserinfoService } from 'src/app/services/users/userinfo.service';
import { AnimationOptions } from 'ngx-lottie';
import { DomSanitizer } from '@angular/platform-browser';
import { EMPTY, throwError } from 'rxjs';

export function passwordMatchValidator(): ValidatorFn
{
  return (control: AbstractControl):ValidationErrors | null => {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !== confirmPassword){
      return {passwordsDontMatch: true};
    }else{
      return null;
    }
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  option: AnimationOptions = {path : 'assets/json/herbs.json'}
  signUpForm: FormGroup;
  showpass:boolean = false;
  emailVerified:boolean =false;


  constructor(
    private authService : AuthService,
    private router: Router,
    private toast : ToastController,
    private userService: UserinfoService,
    private fb: FormBuilder,
    private alert: AlertController,
    private load:LoadingController,
  ) { }

  get email(){
    return this.signUpForm.get('email');
  }

  get password(){
    return this.signUpForm.get('password');
  }

  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
  }

  get name(){
    return this.signUpForm.get('name');
  }
  
  get emailverify(){
    return this.emailVerified
  }


  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      confirmPassword: ['',[Validators.required,Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    },
    {validators: passwordMatchValidator()}
    );
  }

  async submit() {
    const loading = await this.load.create();

    const { name, email, password} = this.signUpForm.value;
  
    await loading.present();

    if (!this.signUpForm.valid || !name || !password || !email) {
      this.showAlert('Empty Fields', 'Please fill up the form to proceed.');
      await loading.dismiss();
      return;
    }
    this.authService.signup(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.userService.addUser({ uid, email, displayname: name, password , isAdmin: false})
        ),
        catchError((error) => {
          if (error.code === 'auth/email-already-in-use') {
            // User not registered, show an alert
            this.showAlert('Registration Faild', 'This email is already registered. Please use a differrent one.');
            loading.dismiss();
          }
          return EMPTY; // Return an empty observable to stop the sequence
        }),
      ).subscribe(() => {
        // Reset the form after successful registration
        this.resetForm();
        // Navigate to the verify-email page
        this.router.navigate(['verify-email']);
        loading.dismiss();
      });
  }
  
  
  toggleshow(){
		this.showpass = !this.showpass;
	}

  resetForm() {
    this.signUpForm.reset(); // Reset the form controls
    this.signUpForm.setErrors(null); // Clear any validation errors
  }

  login(){
    this.router.navigate(['/login']).then(() => {
      this.resetForm();
    });
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
}
