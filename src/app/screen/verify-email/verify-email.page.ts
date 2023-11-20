import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertController, LoadingController } from '@ionic/angular'; // Import AlertController
import { Router } from '@angular/router'; // Import Router
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  credentials: FormGroup | any;

  constructor(private authService: AuthService,
    private alertController: AlertController,
  
    private fb: FormBuilder,
    private route : Router,
    private loadingController: LoadingController,
    private alert: AlertController,
    ) {}

    get email() {
      return this.credentials.get('email');
    }
  
  
    ngOnInit() {
      this.credentials = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
    }

    async sendEmailVerification() {
      const { email } = this.credentials.value;
        // Show loading indicator
      const loading = await this.loadingController.create({
        message: 'Sending verfication email...',
        });

      await loading.present();
      if (!this.credentials.valid || !email) {
        this.showAlert('Empty Fields', 'Please fill up the form to proceed.');
        await loading.dismiss();
        return;
      }

      this.authService.sendEmailVerification().subscribe({
        next: async () => {
  
          // Dismiss loading indicator
            await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Success',
            message: `Verfication email has been sent to ${email}`,
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
          this.credentials.reset();
          await alert.present();
        },
        error: async (error: any) => {
  
            await loading.dismiss();
          
    
          console.log('Error sending verfication email:', error);
    
          if (error.code === 'auth/user-not-found') {
            const alert = await this.alertController.create({
              header: 'Email Not Found',
              message: 'The email is not registered',
              buttons: ['OK'],
              cssClass: 'custom-alert',
            });
    
            await alert.present();
          } else if (error.code === 'auth/missing-email') {
            const alert = await this.alertController.create({
              header: 'Error',
              message: 'Missing email. Please provide a valid email address.',
              buttons: ['OK'],
              cssClass: 'custom-alert',
            });
    
            await alert.present();
          } else {
            // Show a generic error message in an alert here if needed
            const alert = await this.alertController.create({
              header: 'Error',
              message: 'Error sending password reset email',
              buttons: ['OK'],
              cssClass: 'custom-alert',
            });
    
            await alert.present();
          }
       
        },
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
