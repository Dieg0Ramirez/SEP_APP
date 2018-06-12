import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadenaService } from '../../../../services/services.index';

declare var AdminLTE: any;

@Component({
  selector: 'app-cadenas',
  templateUrl: './cadenas.component.html',
  styleUrls: ['./cadenas.component.css']
})
export class CadenasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AdminLTE.init();
  }

  updateCadena(cadena) {

  }

  estadoCadena(cadena) {

  }

}
