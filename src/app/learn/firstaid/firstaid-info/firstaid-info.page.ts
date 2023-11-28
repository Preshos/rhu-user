import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-firstaid-info',
  templateUrl: './firstaid-info.page.html',
  styleUrls: ['./firstaid-info.page.scss'],
})
export class FirstaidInfoPage implements OnInit {

   
   constructor(private router:Router) { }
   cancel(){
     this.router.navigate(['tabs/tabs/info-home']);
   }
  ngOnInit() {
  }

}
