import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whay-herb',
  templateUrl: './whay-herb.page.html',
  styleUrls: ['./whay-herb.page.scss'],
})
export class WhayHerbPage implements OnInit {

  constructor(private router:Router) { }
  cancel(){
    this.router.navigate(['tabs/tabs/info-home']);
  }

  ngOnInit() {
  }

}
