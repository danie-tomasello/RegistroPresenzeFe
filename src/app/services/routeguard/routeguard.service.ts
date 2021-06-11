import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';
import { AuthappService } from '../auth/authapp.service';


@Injectable({
  providedIn: 'root'
})
export class RouteguardService implements CanActivate {

  token?: string;
  rolesToken?: string;

  constructor(private auth: AuthappService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) { 
    let acctoken = this.auth.getAuthToken()
    this.token = acctoken===null?undefined:acctoken;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.token);

    if(this.auth.isLogged()){
      this.rolesToken = decodedToken["roles"];
      if(!route.data.role){
        return true;
      }
      else if(this.rolesToken?.includes(route.data.role)) {
        return true;
      }
      else {
        this.route.navigateByUrl('/login');
        alert("Non sei autorizzato ad accedere alla schermata selezionata. DA VEDERE");
        return false;
      }
    }
    else{
        this.route.navigateByUrl('/login');
        return false;
    }
  }
}
  