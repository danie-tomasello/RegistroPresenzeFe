import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificheComponent } from 'src/app/notifiche/notifiche.component';
import { UserService } from 'src/app/services/data/user/user.service';
import { ChangePass } from 'src/models/ChangePass';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private userService:UserService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.passForm= new FormGroup({
      
      oldPassword: new FormControl('', [  Validators.required ]),
  
      newPassword: new FormControl('', [  Validators.required, Validators.minLength(4) ]),
  
      confirmPassword: new FormControl('', [  Validators.required ])
    },
    { 
      validators: this.checkPasswords
    });
  }

  
  passForm:FormGroup;

  get oldPassword() { return this.passForm.get('oldPassword'); }

  get newPassword() { return this.passForm.get('newPassword'); }

  get confirmPassword() { return this.passForm.get('confirmPassword'); }

  checkPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('newPassword');
    const password2 = control.get('confirmPassword');

    return password && password2 && password.value === password2.value ? null : { notSame: true };
  };


  updatePassword(){
    if (!this.passForm.invalid) {
      let cp:ChangePass = new ChangePass(
        this.oldPassword.value,
        this.newPassword.value
        );
      this.userService.updatePassword(cp);
    }
    else{
      this.dialog.open(NotificheComponent,{data:{message: "Le password non corrispondono"}}).updatePosition({
        top: '100px'
        
      });
    }
    
  }

  getErrorMessage(field:string){
    switch(field) { 
      case 'oldPassword': { 
        if (this.oldPassword.hasError('required')) {
          return 'Devi inserire la password corrente';
        }
        break; 
      } 
      case 'newPassword': { 
        if (this.newPassword.hasError('required')) {
          return 'Devi inserire una nuova password';
        }
        if (this.newPassword.hasError('minlength')) {
          return 'Deve contenere almeno 4 caratteri';
        }  
        break; 
      } 
      case 'confirmPassword': { 
        if (this.confirmPassword.hasError('required')) {
          return 'Devi confermare la password';
        } 
        break; 
      } 
      default: { 
        return ''; 
      } 
   } 

  }
}
