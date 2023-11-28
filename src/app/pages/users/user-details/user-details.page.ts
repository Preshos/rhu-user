import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileUser } from 'src/app/services/users/user';
import { UserinfoService } from 'src/app/services/users/userinfo.service';
 
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  currentuser = this.userService.currentUserProfile$;
  public user: ProfileUser;
  sub1: Subscription;
  isAdmin$: Observable<boolean>;
  constructor(
    private userService: UserinfoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.userService.getUserById(id)
    .subscribe(user => {
      // if the contact doesn't exists, return to home page
      if (!user) {
        this.router.navigate(['tabs/tabs/user-home']);
      } else {
        this.user = user;
      }
    });
  
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
  back(){
    this.router.navigate(['tabs/tabs/user-home']);
  }
  isAdminLoggedIn(){
    this.currentuser
  }
  
}
