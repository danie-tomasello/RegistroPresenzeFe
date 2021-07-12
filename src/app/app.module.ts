import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NotificheComponent } from './notifiche/notifiche.component';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportComponent } from './report/report.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';
import { GuestUserComponent } from './guest-user/guest-user.component';
import { ProfileComponent } from './guest-user/profile/profile.component';
import { UpdateUserComponent } from './form/update-user/update-user.component';
import { UpdatePasswordComponent } from './form/update-password/update-password.component';
import { GestioneUtentiComponent } from './admin/gestione-utenti/gestione-utenti.component';
import { CreateUserComponent } from './form/create-user/create-user.component';
import { UserListComponent } from './admin/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    NotificheComponent,
    ReportComponent,
    UpdatePasswordComponent,
    UpdateUserComponent,
    ProfileComponent,
    GuestUserComponent,
    GestioneUtentiComponent,
    CreateUserComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents:[NotificheComponent]
})
export class AppModule { }
