import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo,canActivate} from '@angular/fire/auth-guard';
import { AuthService } from './services/auth/auth.service';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['tabs']) 
const routes: Routes = [ 

  { path: '', redirectTo: 'landingpage', pathMatch: 'full' },
  {
    path: 'landingpage',
    loadChildren: () => import('./screen/landingpage/landingpage.module').then( m => m.LandingpagePageModule),
    
  },
  {
    path: 'login',
    loadChildren: () => import('./screen/login/login.module').then( m => m.LoginPageModule),
    
  },
 
  {
    path: 'signup',
    loadChildren: () => import('./screen/signup/signup.module').then( m => m.SignupPageModule),
    
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./screen/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule),

  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./screen/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule),
    
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tab/tabs/tabs.module').then( m => m.TabsPageModule),
  },
  {
    path: 'herb-create',
    loadChildren: () => import('./pages/herbs/herb-create/herb-create.module').then( m => m.HerbCreatePageModule)
  },
  {
    path: 'herb-update/:id',
    loadChildren: () => import('./pages/herbs/herb-update/herb-update.module').then( m => m.HerbUpdatePageModule)
  },
  {
    path: 'herb-details/:id',
    loadChildren: () => import('./pages/herbs/herb-details/herb-details.module').then( m => m.HerbDetailsPageModule)
  },
  {
    path: 'user-details/:id',
    loadChildren: () => import('./pages/users/user-details/user-details.module').then( m => m.UserDetailsPageModule)
  },
  {
    path: 'aidkit-create',
    loadChildren: () => import('./pages/first-aid-kit/aidkit-create/aidkit-create.module').then( m => m.AidkitCreatePageModule)
  },
  {
    path: 'aidkit-details/:id',
    loadChildren: () => import('./pages/first-aid-kit/aidkit-details/aidkit-details.module').then( m => m.AidkitDetailsPageModule)
  },
  {
    path: 'aidkit-update/:id',
    loadChildren: () => import('./pages/first-aid-kit/aidkit-update/aidkit-update.module').then( m => m.AidkitUpdatePageModule)
  },
  {
    path: 'emergency-create',
    loadChildren: () => import('./pages/emergencies/emergency-create/emergency-create.module').then( m => m.EmergencyCreatePageModule)
  },
  {
    path: 'emergency-update/:id',
    loadChildren: () => import('./pages/emergencies/emergency-update/emergency-update.module').then( m => m.EmergencyUpdatePageModule)
  },
  {
    path: 'emergency-details/:id',
    loadChildren: () => import('./pages/emergencies/emergency-details/emergency-details.module').then( m => m.EmergencyDetailsPageModule)
  },
  {
    path: 'firstaid-create',
    loadChildren: () => import('./pages/firstaid/firstaid-create/firstaid-create.module').then( m => m.FirstaidCreatePageModule)
  },
  {
    path: 'firstaid-details/:id',
    loadChildren: () => import('./pages/firstaid/firstaid-details/firstaid-details.module').then( m => m.FirstaidDetailsPageModule)
  },
  {
    path: 'firstaid-update/:id',
    loadChildren: () => import('./pages/firstaid/firstaid-update/firstaid-update.module').then( m => m.FirstaidUpdatePageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/users/user/user.module').then( m => m.UserPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
