import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-why',
  templateUrl: './why.page.html',
  styleUrls: ['./why.page.scss'],
})
export class WhyPage implements OnInit {

   
   constructor(private router:Router) { }
   cancel(){
     this.router.navigate(['tabs/tabs/info-home']);
   }

  ngOnInit() {
  }

}
