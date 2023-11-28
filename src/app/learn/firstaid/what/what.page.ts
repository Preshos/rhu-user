import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-what',
  templateUrl: './what.page.html',
  styleUrls: ['./what.page.scss'],
})
export class WhatPage implements OnInit {

   constructor(private router:Router) { }
   cancel(){
     this.router.navigate(['tabs/tabs/info-home']);
   }

  ngOnInit() {
  }

}
