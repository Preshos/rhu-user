
import { Component, OnInit } from '@angular/core';
import { ProfileUser } from 'src/app/services/users/user';
import { Observable, debounceTime, of } from 'rxjs';
import { UserinfoService } from 'src/app/services/users/userinfo.service';
import { ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage implements OnInit {

  public user: Observable<ProfileUser[]>;
  totalUsers: number;
  constructor(
    private dataService: UserinfoService,
    public modalController: ModalController,
    private route:Router,
    private cdr: ChangeDetectorRef
  ) {
    this.user = this.dataService.getProfileUserAlphabetically();
  }

  ngOnInit() {
    this.dataService.getTotalUsersCount().subscribe(count => {
      this.totalUsers = count;
    });
  }

  back(){
    this.route.navigate(['tabs/tabs/user-home']);
  }

  doRefresh(event: any) {
    this.dataService.getProfileUserAlphabetically()
      .pipe(
        debounceTime(2000) // Adjust the time (in milliseconds) based on your requirements
      )
      .subscribe(users => {
        this.user = of(users); // Create a new reference to trigger change detection
        this.cdr.detectChanges(); // Manually trigger change detection
        event.target.complete();
      });
  }
}
