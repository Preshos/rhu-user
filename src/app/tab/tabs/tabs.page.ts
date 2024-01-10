import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  constructor(private router: Router) { }

  navigateTo(route: string) {
    this.router.navigate(['/tabs/tabs/', route]);
  }

  isActive(route: string): boolean {
    return this.router.url.endsWith(route);
  }
}
