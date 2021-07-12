import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ruoli } from 'src/models/Ruoli';
import { GestioneUtentiComponent } from './admin/gestione-utenti/gestione-utenti.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { CreateUserComponent } from './form/create-user/create-user.component';
import { UpdatePasswordComponent } from './form/update-password/update-password.component';
import { UpdateUserComponent } from './form/update-user/update-user.component';
import { GuestUserComponent } from './guest-user/guest-user.component';
import { ProfileComponent } from './guest-user/profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { RouteguardService } from './services/routeguard/routeguard.service';


const routes: Routes = [
  {
    path:'login', 
    component : LoginComponent
  },
  {
    path:'', 
    component : LoginComponent
  },
  {
    path:'gestione-account',
    component : GuestUserComponent,
    canActivate:[RouteguardService], 
    data:{role: Ruoli.utente},
    children: [
      {
        path: 'profilo',
        component: ProfileComponent
      },
      {
        path: 'update-user',
        component: UpdateUserComponent
      },
      {
        path: 'change-password', 
        component: UpdatePasswordComponent
      }
    ]
  },
  {
    path:'home',
    component : ReportComponent,
    canActivate:[RouteguardService], 
    data:{role: Ruoli.utente}
  },
  {
    path:'admin', 
    canActivate:[RouteguardService], 
    data:{role: Ruoli.admin},
    children: [
      {
        path: 'gestione-utenti',
        component: GestioneUtentiComponent,
        children: [
          {
            path: 'crea-utente',
            component: CreateUserComponent,
          },
          {
            path: 'elenco-utenti',
            component: UserListComponent,
          },
          { 
            path: 'modifica-utente/:id', 
            component: UpdateUserComponent 
          }

        ]
      },
      { 
        path: 'report-utente/:id', 
        component: ReportComponent 
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
