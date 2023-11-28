import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo,canActivate} from '@angular/fire/auth-guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['tabs']) 
const routes: Routes = [ 

  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'landingpage',
    loadChildren: () => import('./screen/landingpage/landingpage.module').then( m => m.LandingpagePageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'login',
    loadChildren: () => import('./screen/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
 
  {
    path: 'signup',
    loadChildren: () => import('./screen/signup/signup.module').then( m => m.SignupPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./screen/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule),
    ...canActivate(redirectLoggedInToHome)
    
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tab/tabs/tabs.module').then( m => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./screen/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule),

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
  {
    path: 'firstaid-info',
    loadChildren: () => import('./learn/firstaid/firstaid-info/firstaid-info.module').then( m => m.FirstaidInfoPageModule)
  },
  {
    path: 'aim',
    loadChildren: () => import('./learn/firstaid/aim/aim.module').then( m => m.AimPageModule)
  },
  {
    path: 'what',
    loadChildren: () => import('./learn/firstaid/what/what.module').then( m => m.WhatPageModule)
  },
  {
    path: 'why',
    loadChildren: () => import('./learn/firstaid/why/why.module').then( m => m.WhyPageModule)
  },
  {
    path: 'what',
    loadChildren: () => import('./learn/herbal/what/what.module').then( m => m.WhatPageModule)
  },
  {
    path: 'why',
    loadChildren: () => import('./learn/herbal/why/why.module').then( m => m.WhyPageModule)
  },
  {
    path: 'aim',
    loadChildren: () => import('./learn/herbal/aim/aim.module').then( m => m.AimPageModule)
  },
  {
    path: 'herbal-info',
    loadChildren: () => import('./learn/herbal/herbal-info/herbal-info.module').then( m => m.HerbalInfoPageModule)
  },
  {
    path: 'what-herb',
    loadChildren: () => import('./learn/herbal/what-herb/what-herb.module').then( m => m.WhatHerbPageModule)
  },
  {
    path: 'whay-herb',
    loadChildren: () => import('./learn/herbal/whay-herb/whay-herb.module').then( m => m.WhayHerbPageModule)
  },
  {
    path: 'aim-herb',
    loadChildren: () => import('./learn/herbal/aim-herb/aim-herb.module').then( m => m.AimHerbPageModule)
  },
  {
    path: 'user-update/:id',
    loadChildren: () => import('./pages/user-update/user-update.module').then( m => m.UserUpdatePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
