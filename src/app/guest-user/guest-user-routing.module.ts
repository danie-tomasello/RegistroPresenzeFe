import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePasswordComponent } from '../form/update-password/update-password.component';
import { UpdateUserComponent } from '../form/update-user/update-user.component';
import { GuestUserComponent } from './guest-user.component';
import { ProfileComponent } from './profile/profile.component';



const guestUserRoutes: Routes = [
  
    {path: 'profilo',component: ProfileComponent},
    {path: 'update-user',component: UpdateUserComponent},
    {path: 'change-password', component: UpdatePasswordComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(guestUserRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GuestUserRoutingModule { }