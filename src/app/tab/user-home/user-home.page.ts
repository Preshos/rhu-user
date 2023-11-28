import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, take, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserinfoService } from 'src/app/services/users/userinfo.service';
import { ProfileUser } from 'src/app/services/users/user';
import { NonNullableFormBuilder } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {

  isUserOnline: boolean;
  isAdmin: boolean;
  totalUsers: number;
  user = this.userinfoservice.currentUserProfile$;

 
  
  sub1: Subscription;
  constructor(
    private userinfoservice:UserinfoService,
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: NonNullableFormBuilder,
    private alert : AlertController,
    private loadingCtrl: LoadingController,
    private authService:AuthService
  ) {}

  async logout() {
    const alert = await this.alert.create({
      header: 'Confirmation',
      message: 'Do you want to log out of your account?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: async () => {
            const user = await this.authService.currenUser$.pipe(take(1)).toPromise();
  
            if (user) {
              // Show loading while checking and updating user status
              const loading = await this.loadingCtrl.create({ message: 'Logging out...' });
              loading.present();
  
              // Update user status to offline on logout
              await this.userinfoservice.updateUserStatusOffline(user.uid);
              // Logout
              await this.auth.logout();
  
                // Dismiss loading spinner after a delay
                setTimeout(() => {
                  loading.dismiss();
                  this.router.navigate(['/login']);
              }, 1300);
            }
          },
        },
      ],
      cssClass: 'custom-logout',
    });
  
    await alert.present();
  }
  
  back(){

  }
  ngOnInit() {

      this.auth.isAdmin$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });

      this.userinfoservice.getTotalUsersCount().subscribe(count => {
        this.totalUsers = count;
      });

      this.userinfoservice.currentUserProfile$.subscribe((user) => {
        this.isUserOnline = user?.isOnline;
      });
  }

  users(){
    this.router.navigate(['/user']);
  }

  
}
