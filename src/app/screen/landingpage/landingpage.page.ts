import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Swiper } from 'swiper';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.page.html',
  styleUrls: ['./landingpage.page.scss'],
})
export class LandingpagePage implements OnInit {

  @ViewChild('swiper') swiper?:ElementRef  <{swiper:Swiper}>;
  

  // logActiveIndex() {
  //   console.log(this.swiper?.nativeElement.swiper.activeIndex);
  // }
  
  slidePrev(){
    this.swiper.nativeElement.swiper.slidePrev();
  
  }
  slideNext(){
    this.swiper.nativeElement.swiper.slideNext();
  }
  
  constructor() { }

  ngOnInit() {
  }

  titles = [
    { url:('/assets/landing page pictures/hand-heart.jpg') , message : "🚑 Learn essential life-saving techniques. 🚑"},
    { url:('/assets/landing page pictures/hand-plant.jpg') , message : "🌱 Discover the Healing Power of Nature! 🌱" },
    { url:('/assets/landing page pictures/hand-bulb.jpg')  , message : "💡 Quick tips for easy recall during emergencies💡" },
  ]
}
