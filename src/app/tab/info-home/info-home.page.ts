import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
@Component({
  selector: 'app-info-home',
  templateUrl: './info-home.page.html',
  styleUrls: ['./info-home.page.scss'],
})
export class InfoHomePage implements OnInit {
  
  selectedSegment: string = '1';
  @ViewChild('swiper') swiper?:ElementRef  <{swiper:Swiper}>;
  constructor() { }

  ngOnInit() {
  }
  selectSegment(segment: number) {
    this.swiper.nativeElement.swiper.slideTo(segment - 1);
    this.selectedSegment = (this.swiper.nativeElement.swiper.activeIndex + 1).toString()
  }

  slideDidChange() {
    // console.log(this.swiper?.nativeElement.swiper.activeIndex);
    this.selectedSegment = (this.swiper.nativeElement.swiper.activeIndex + 1).toString();
  }

}
