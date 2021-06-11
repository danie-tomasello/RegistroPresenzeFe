import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ruoli } from 'src/models/Ruoli';
import { server } from './app.constants';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { RouteguardService } from './services/routeguard/routeguard.service';


const routes: Routes = [
  {path:'login', component : LoginComponent},
  {path:'', component : LoginComponent},
  {path:'home',component : ReportComponent,canActivate:[RouteguardService], data:{role: Ruoli.utente}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
