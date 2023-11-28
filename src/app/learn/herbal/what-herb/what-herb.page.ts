import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-what-herb',
  templateUrl: './what-herb.page.html',
  styleUrls: ['./what-herb.page.scss'],
})
export class WhatHerbPage implements OnInit {

   constructor(private router:Router) { }
   cancel(){
     this.router.navigate(['tabs/tabs/info-home']);
   }

  ngOnInit() {
  }

}
