import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Credencial } from 'src/models/Credencial';
import { NotificheComponent } from '../notifiche/notifiche.component';
import { AuthappService } from '../services/auth/authapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credencial = new Credencial('', ''); 

  constructor(private route: Router,private auth: AuthappService,private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  hide = true;

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  

  getErrorMessage(field:string) {
    if (field==='username'&&this.username.hasError('required')) {
      return 'Devi inserire un nome utente';
    }
    if (field==='password'&&this.password.hasError('required')) {
      return 'Devi inserire una password';
    }

    return '';
  }

  gestAuth(){   
    this.credencial = new Credencial(this.username.value, this.password.value); 
    this.auth.signin(this.credencial).subscribe(
      response => {
        console.log("success login components")
        window.location.href = "http://localhost:4200/home";
      },
      error => {
        this.dialog.open(NotificheComponent,{data:{message: error.error.cause}}).updatePosition({
          top: '100px'
        });
        console.log("error login components");
      }
    )  
  }

}
