import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import { authGuard } from 'src/app/guards/auth.guard';
import { otpGuard } from 'src/app/guards/otp.guard';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./first-page/first-page.module').then(m => m.FirstPagePageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then(m => m.OtpPageModule),
    canActivate: [otpGuard]
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then(m => m.SuccessPageModule)
  },

  {
    path: '**',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule { }
