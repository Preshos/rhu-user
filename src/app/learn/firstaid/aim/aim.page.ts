import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-aim',
  templateUrl: './aim.page.html',
  styleUrls: ['./aim.page.scss'],
})
export class AimPage implements OnInit {
  //import { Router } from '@angular/router';
  constructor(private router:Router) { }
  cancel(){
    this.router.navigate(['tabs/tabs/info-home']);
  }

  ngOnInit() {
  }
  
}
