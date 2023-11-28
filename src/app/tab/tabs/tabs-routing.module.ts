import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
      { path: 'herb-home', loadChildren: () => import('../herb-home/herb-home.module').then( m => m.HerbHomePageModule)}, 
      { path: 'aidkit-home', loadChildren: () => import('../aidkit-home/aidkit-home.module').then( m => m.AidkitHomePageModule)},
      { path: 'emergency-home', loadChildren: () => import('../emergency-home/emergency-home.module').then( m => m.EmergencyHomePageModule)},
      { path: 'user-home', loadChildren: () => import('../user-home/user-home.module').then( m => m.UserHomePageModule)},
      { path: 'firstaid-home', loadChildren: () => import('../firstaid-home/firstaid-home.module').then( m => m.FirstaidHomePageModule)},
      { path: 'info-home', loadChildren: () => import('../info-home/info-home.module').then( m => m.InfoHomePageModule)},
    ]
  },

  { path: '', redirectTo: 'tabs/herb-home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
