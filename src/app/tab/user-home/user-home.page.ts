import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, tap } from 'rxjs';
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

  
  isAdmin: boolean;
  totalUsers: number;
  user = this.userinfoservice.currentUserProfile$;

  profileForm = this.fb.group({
    uid: [''],
    displayname:['']
  });
  
  sub1: Subscription;
  constructor(
    private userinfoservice:UserinfoService,
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: NonNullableFormBuilder,
    private alert : AlertController,
    private loadingCtrl: LoadingController
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
          handler: () => {
            // Perform the logout action when the Logout button is clicked
            this.auth.logout().subscribe(async () => {
              const loading = await this.loadingCtrl.create();

              loading.present();

              setTimeout(() => {
                loading.dismiss();

                this.router.navigate(['/login']);
              }, 1300);
            });
          },
        }
      ],
      cssClass : 'custom-logout'
    });

    await alert.present();
  }

  back(){

  }
  ngOnInit() {
    this.userinfoservice.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });

      this.auth.isAdmin$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });

      this.userinfoservice.getTotalUsersCount().subscribe(count => {
        this.totalUsers = count;
      });
  }
  users(){
    this.router.navigate(['/user']);
  }
}
