import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificheComponent } from 'src/app/notifiche/notifiche.component';
import { UserService } from 'src/app/services/data/user/user.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private userService:UserService,private dialog:MatDialog) { }
  
  

  ngOnInit(): void {
    this.getUser();
  }
  
  user:User;
  userForm:FormGroup=new FormGroup({
      
    username: new FormControl('', [  Validators.required, Validators.minLength(4) ]),

    name: new FormControl('', [  Validators.required ]),

    surname: new FormControl('', [  Validators.required ]),
    
    email: new FormControl('', [ Validators.email, Validators.required ]),

    phoneNumber: new FormControl('',[ Validators.required, Validators.pattern("^[0-9]*$") ])
    
  });

  get username() { return this.userForm.get('username'); }

  get surname() { return this.userForm.get('surname'); }

  get name() { return this.userForm.get('name'); }

  get email() { return this.userForm.get('email'); }

  get phoneNumber() { return this.userForm.get('phoneNumber'); }

  updateUser(){
    let user:User = new User(
      this.user.id,
      this.username.value,
      this.name.value,
      this.surname.value,
      this.email.value,
      this.phoneNumber.value,
      this.user.creationDate,
      this.user.authorities
      );
    this.userService.updateAccount(user);
    
  }
  getUser(){
    this.userService.loadAccount().subscribe(
      
      res=>{
        console.log(res);
        this.userForm.setValue({
          username:res.username,
          name:res.name,
          surname:res.surname,
          email:res.email,
          phoneNumber:res.phoneNumber
        });
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

  getErrorMessage(field:string){
    switch(field) { 
      case 'username': { 
        if (this.username.hasError('required')) {
          return 'Devi inserire un nome utente';
        }
        if (this.username.hasError('minlength')) {
          return 'Il nome utente deve essere composto da almeno 4 caratteri ';
        }
        break; 
      } 
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



