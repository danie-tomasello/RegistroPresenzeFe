import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GuestUserRoutingModule } from './guest-user-routing.module';
import { GuestUserComponent } from './guest-user.component';
import { UpdatePasswordComponent } from '../form/update-password/update-password.component';
import { UpdateUserComponent } from '../form/update-user/update-user.component';
import { MaterialModule } from '../shared/material.module';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GuestUserRoutingModule,
    MaterialModule
  ],
  declarations: [
    GuestUserComponent,
    UpdatePasswordComponent,
    UpdateUserComponent,
    ProfileComponent,
    
  ]
})
export class GuestUserModule {}