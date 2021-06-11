import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-notifiche',
  templateUrl: './notifiche.component.html',
  styleUrls: ['./notifiche.component.css']
})
export class NotificheComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: {message: string}
    ){}
  
  

}
