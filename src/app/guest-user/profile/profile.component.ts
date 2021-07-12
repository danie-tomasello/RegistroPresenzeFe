import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificheComponent } from 'src/app/notifiche/notifiche.component';
import { UserService } from 'src/app/services/data/user/user.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UserService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getUser();
  }

  user:User;

  getUser(){
    this.userService.loadAccount().subscribe(
      
      res=>{
        this.user=res;
        
      },
      error=>{
        this.dialog.open(NotificheComponent,{data:{message: error.error.cause}}).updatePosition({
          top: '100px'
          
        });
        console.log(error);
      }
    );
  }

  getUserRole(){
    var role ="";
    if(this.user.authorities.includes("ROLE_USER")){
      role="User";
    }
    if(this.user.authorities.includes("ROLE_ADMIN")){
      role="Admin";
    }
    return role;
  }
}
