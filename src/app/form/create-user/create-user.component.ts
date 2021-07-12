import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificheComponent } from 'src/app/notifiche/notifiche.component';
import { UserService } from 'src/app/services/data/user/user.service';
import { SaveUserReq } from 'src/models/SaveUserReq';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private userService:UserService,private dialog:MatDialog) { }
  
  auths: Object[] = [
    {value: ['ROLE_USER'], viewValue: 'User'},
    {value: ['ROLE_ADMIN','ROLE_USER'], viewValue: 'Admin'}
  ];
  

  ngOnInit(): void {
  }
  
  userForm:FormGroup=new FormGroup({

    name: new FormControl('', [  Validators.required ]),

    surname: new FormControl('', [  Validators.required ]),
    
    email: new FormControl('', [ Validators.email, Validators.required ]),

    phoneNumber: new FormControl('',[ Validators.required, Validators.pattern("^[0-9]*$") ]),

    authorities: new FormControl('',[ Validators.required ])
    
  });

  get surname() { return this.userForm.get('surname'); }

  get name() { return this.userForm.get('name'); }

  get email() { return this.userForm.get('email'); }

  get phoneNumber() { return this.userForm.get('phoneNumber'); }

  get authorities() { return this.userForm.get('authorities'); }

  createUser(){
    let user:SaveUserReq = new SaveUserReq(
      this.name.value,
      this.surname.value,
      this.generatePassword(),
      this.email.value,
      this.phoneNumber.value,
      this.authorities.value
      );
      console.log(user);
    this.userService.saveAccount(user);
    
  }
  generatePassword(): string {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
  }

  getErrorMessage(field:string){
    switch(field) { 
      case 'name': { 
        if (this.name.hasError('required')) {
          return 'Devi inserire un nome';
        } 
        break; 
      } 
      case 'surname': { 
        if (this.surname.hasError('required')) {
          return 'Devi inserire un cognome';
        } 
        break; 
      } 
      case 'email': { 
        if (this.email.hasError('required')) {
          return 'Devi inserire una e-mail';
        }
        if (this.email.hasError('email')) {
          return 'Devi inserire una e-mail valida';
        } 
        break; 
      }
      case 'phoneNumber': { 
        if (this.phoneNumber.hasError('required')) {
          return 'Devi inserire un numero di telefono';
        }
        if (this.phoneNumber.hasError('pattern')) {
          return 'Devi inserire un numero di telefono valido';
        } 
        break; 
      }  
      default: { 
        return ''; 
      } 
   } 

  }

}
