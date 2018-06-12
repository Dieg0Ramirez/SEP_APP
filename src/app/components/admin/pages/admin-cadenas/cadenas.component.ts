import { Component, OnInit } from '@angular/core';

declare var AdminLTE: any;

@Component({
  selector: 'app-cadenas',
  templateUrl: './cadenas.component.html',
  styleUrls: ['./cadenas.component.css']
})
export class CadenasComponent implements OnInit {
  listCadena = [];

  constructor() { }

  ngOnInit() {
    AdminLTE.init();
  }

  updateCadena(cadena) {

  }

  estadoCadena(cadena) {

  }

}
