import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  option: AnimationOptions = {path : 'assets/json/firstaid.json'}
  option1:AnimationOptions = {path : 'assets/json/loading.json'}

  constructor(private router:Router) {
    setTimeout(() => {
      this.router.navigateByUrl('/landingpage')
    }, 1500);
   }

  
  ngOnInit() {
  }

}
