import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aim-herb',
  templateUrl: './aim-herb.page.html',
  styleUrls: ['./aim-herb.page.scss'],
})
export class AimHerbPage implements OnInit {

   constructor(private router:Router) { }
   cancel(){
     this.router.navigate(['tabs/tabs/info-home']);
   }

  ngOnInit() {
  }

}
