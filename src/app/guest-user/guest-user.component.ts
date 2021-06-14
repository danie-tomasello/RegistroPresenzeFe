import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-user',
  templateUrl: './guest-user.component.html',
  styleUrls: ['./guest-user.component.css']
})
export class GuestUserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  panelOpenState = false;
  formSelect?: string;
}
