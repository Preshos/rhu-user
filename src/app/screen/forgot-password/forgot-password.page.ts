import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  credentials: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private route : Router,
    private loadingController: LoadingController,
    private alert: AlertController,
  ) { }

  get email() {
    return this.credentials.get('email');
  }


  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  login(){
    this.route.navigate(['/login']).then(
      this.credentials.reset()
    );
  }
  async resetPassword() {
    const { email } = this.credentials.value;
  
    // Show loading indicator
    const loading = await this.loadingController.create({
      message: 'Sending password reset email...',
    });
    await loading.present();
  
    try {
      if (!email) {
        throw new Error('Missing Email. Please provide a valid email address.');
      }
      if (!this.credentials.valid) {
        throw new Error('Invalid Email. Please enter a valid email address.');
      }
  
      await this.authService.resetpassword(email).toPromise();

      // Dismiss loading indicator
      await loading.dismiss();
  
      const alert = await this.alertController.create({
        header: 'Success',
        message: `Password reset email has been sent to ${email}`,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.route.navigate(['/login']);
            },
          },
        ],
        cssClass: 'alert-success',
      });

      // Log out the user
      this.authService.logout();
      //reset the form
      this.credentials.reset();
      await alert.present();
    } catch (error) {
      await loading.dismiss();
  
      const errorMessage =
        error.code === 'auth/user-not-found'
          ? 'The email is not registered'
          : error.code === 'auth/invalid-email'
          ? 'Invalid email address'
          : error.message || 'Error sending password reset email';
  
      await this.showAlert('Error', errorMessage);
    }
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
  back(){
    this.route.navigate(['/login']).then(
      this.credentials.reset()
    );
  }
}
