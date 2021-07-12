import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestione-utenti',
  templateUrl: './gestione-utenti.component.html',
  styleUrls: ['./gestione-utenti.component.css']
})
export class GestioneUtentiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  panelOpenState = false;
}
