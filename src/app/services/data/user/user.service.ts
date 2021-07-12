import { Injectable } from '@angular/core';
import { port, server } from 'src/app/app.constants';
import { User } from 'src/models/User';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NotificheComponent } from 'src/app/notifiche/notifiche.component';
import { ChangePass } from 'src/models/ChangePass';
import { SaveUserReq } from 'src/models/SaveUserReq';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  

  constructor(private httpClient:HttpClient,private dialog:MatDialog) { }

  loadAccount() {
    const url = `http://${server}:${port}/account/get`;
  
    return this.httpClient.get<User>(url ,{ responseType: 'json'});
  }
  getUser(id: string) {
    const url = `http://${server}:${port}/user/get/`+id;
  
    return this.httpClient.get<User>(url ,{ responseType: 'json'});
  }

  saveAccount(user:SaveUserReq){
    const url = `http://${server}:${port}/user/service/save`;
  
    return this.httpClient.post<any>(url, user ,{ responseType: 'json'}).subscribe(
      res=>{
        this.sendMailInfoAccount(user.email,user.password);
        this.dialog.open(NotificheComponent,{data:{message: res.msg}});
      },
      error=>{
        this.dialog.open(NotificheComponent,{data:{message: error.error.cause}}).updatePosition({
          top: '100px'
        });
        console.log(error);
      }
    );
  }

  sendMailInfoAccount(email:string,password:string){
    const url = `http://${server}:${port}/user/service/send?userMail=`+email+`&password=`+password;
  
    return this.httpClient.post<any>(url,{ responseType: 'json'}).subscribe(
      res=>{
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
  deleteUser(id: string) {
    const url = `http://${server}:${port}/user/service/delete/`+id;
  
    return this.httpClient.delete(url ,{ responseType: 'json'});
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

  loadUserList() {
    const url = `http://${server}:${port}/user/get/`;
  
    return this.httpClient.get<User[]>(url ,{ responseType: 'json'});
  }
}

