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

  segments = [
    {
      value: '1',
      image: '/assets/icon/firstaid.png',
      cards: [
        { title: 'What is First Aid', image: '/assets/info_bg/what_f.png', routerLink: '/what' },
        { title: 'Why Learn First Aid', image: '/assets/info_bg/why_f.png', routerLink: '/why' },
        { title: 'Aim of First Aid', image: '/assets/info_bg/aim_f.png', routerLink: '/aim' },
        { title: 'First Aid Info', image: '/assets/info_bg/info_f.png', routerLink: '/firstaid-info' },
      ]
    },
    {
      value: '2',
      image: '/assets/icon/herb.png',
      cards: [
        { title: 'What is Herbal Medicine', image: '/assets/info_bg/what_h.png', routerLink: '/what-herb' },
        { title: 'Why Learn Herbal Medicine', image: '/assets/info_bg/why_h.png', routerLink: '/whay-herb' },
        { title: 'Aim of Herbal Medicine', image: '/assets/info_bg/aim_h.png', routerLink: '/aim-herb' },
      ]
    }
  ];
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
