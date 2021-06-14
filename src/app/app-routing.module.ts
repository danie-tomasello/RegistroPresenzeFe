import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ruoli } from 'src/models/Ruoli';
import { GuestUserComponent } from './guest-user/guest-user.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { RouteguardService } from './services/routeguard/routeguard.service';


const routes: Routes = [
  {path:'login', component : LoginComponent},
  {path:'', component : LoginComponent},
  {path:'gestione-utenti', loadChildren: () => import('./guest-user/guest-user.module').then(m => m.GuestUserModule),component : GuestUserComponent,canActivate:[RouteguardService], data:{role: Ruoli.utente}},
  {path:'home',component : ReportComponent,canActivate:[RouteguardService], data:{role: Ruoli.utente}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
