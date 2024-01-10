import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FirstaidService } from 'src/app/services/first-aid/firstaid.service';
import { FirstAidInfo } from 'src/app/services/first-aid/firstaid';
import Swiper from 'swiper';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-firstaid-details',
  templateUrl: './firstaid-details.page.html',
  styleUrls: ['./firstaid-details.page.scss'],
})
export class FirstaidDetailsPage implements OnInit {

  public info: FirstAidInfo;
  sub1: Subscription;
  selectedSegment: string = '1'; // Initialize to the first segment
  isTouchingTextarea = false;
  touchStartX = 0;
  touchStartY = 0;
  isAdmin: boolean;
  @ViewChild('swiper') swiper?:ElementRef  <{swiper:Swiper}>;

  constructor(
    private infoService: FirstaidService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService : AuthService,
  ) {}
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.infoService.getFirstAidInfoById(id)
    .subscribe(info => {
      // if the contact doesn't exists, return to home page
      if (!info) {
        this.router.navigate(['tabs/tabs/firstaid-home']);
      } else {
        this.info = info;
      }
    });
    this.authService.isAdmin$
      .pipe(take(1))
      .subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });
  }
  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  cancel(){
    this.router.navigate(['tabs/tabs/firstaid-home']);
  }
  selectSegment(segment: number) {
    this.swiper.nativeElement.swiper.slideTo(segment - 1);
    this.selectedSegment = (this.swiper.nativeElement.swiper.activeIndex + 1).toString()
  }

  slideDidChange() {
    // console.log(this.swiper?.nativeElement.swiper.activeIndex);
    this.selectedSegment = (this.swiper.nativeElement.swiper.activeIndex + 1).toString();
  }
  
  onTouchStart(event: TouchEvent) {
    // Check if the touches array is defined and has at least one element
    if (event.touches && event.touches.length > 0) {
      // Store the initial touch position
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    }
    // Check if the touch event started in a textarea
    const target = event.target as HTMLElement;
    this.isTouchingTextarea = target.tagName.toLowerCase() === 'textarea';
  }
  onTouchMove(event: TouchEvent) {
    // Check if event.touches is defined and has at least one touch point
    if (event.touches && event.touches.length > 0) {
      // Store the touch position
      const touchX = event.touches[0].clientX;
      const touchY = event.touches[0].clientY;
  
      // Calculate the horizontal and vertical distances moved
      const deltaX = touchX - this.touchStartX;
      const deltaY = touchY - this.touchStartY;
  
      // Check if the horizontal distance moved is greater than the vertical distance moved
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe detected, handle it here
        // You can trigger the Swiper's horizontal swipe or other actions
  
        if (event.cancelable) {
          event.preventDefault();
        }
      } else {
        // Vertical swipe detected, you may want to handle it differently
        // Allow the default vertical touchmove behavior for scrolling in text areas
      }
    }
  }
}
