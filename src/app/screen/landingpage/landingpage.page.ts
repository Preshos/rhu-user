import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Swiper } from 'swiper';
import { AnimationOptions } from 'ngx-lottie';
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

  option: AnimationOptions = {path : '/assets/landing page pictures/learning.json'}
  option1: AnimationOptions = {path : '/assets/landing page pictures/herbs.json'}
  option2: AnimationOptions = {path : '/assets/landing page pictures/firstaid_phone.json'}
  grow: AnimationOptions = {path : '/assets/landing page pictures/grow_plant.json'}
  

  titles = [
    { options : this.option2, url:('/assets/landing page pictures/hand-heart.jpg') , message : "Learn essential life-saving techniques."},
    { options : this.option1, url:('/assets/landing page pictures/hand-plant.jpg') , message : "Discover the Healing Power of Nature!" },
    { options : this.option ,url:('/assets/landing page pictures/hand-bulb.jpg')  , message : " Quick tips for easy recall during emergencies" },
  ]

}
