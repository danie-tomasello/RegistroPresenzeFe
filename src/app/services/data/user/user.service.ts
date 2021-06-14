import { Injectable } from '@angular/core';
import { port, server } from 'src/app/app.constants';
import { User } from 'src/models/User';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NotificheComponent } from 'src/app/notifiche/notifiche.component';
import { ChangePass } from 'src/models/ChangePass';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private httpClient:HttpClient,private dialog:MatDialog) { }

  loadAccount() {
    const url = `http://${server}:${port}/account/get`;
  
    return this.httpClient.get<User>(url ,{ responseType: 'json'});
  }

  updateAccount(user:User) {
    const url = `http://${server}:${port}/account/update`;
  
    return this.httpClient.post<any>(url, user ,{ responseType: 'json'}).subscribe(
      res=>{
        this.dialog.open(NotificheComponent,{data:{message: res.msg}});
        console.log(res);
      },
      error=>{
        this.dialog.open(NotificheComponent,{data:{message: error.error.cause}}).updatePosition({
          top: '100px'
        });
        console.log(error);
      }
    );
  }

  updatePassword(cp: ChangePass) {

    const url = `http://${server}:${port}/account/changePassword`;

    return this.httpClient.post<any>(url, cp ,{ responseType: 'json'}).subscribe(
      res=>{
        this.dialog.open(NotificheComponent,{data:{message: res.msg}});
        console.log(res);
      },
      error=>{
        this.dialog.open(NotificheComponent,{data:{message: error.error.cause}}).updatePosition({
          top: '100px'
        });
        console.log(error);
      }
    );
  }
}

