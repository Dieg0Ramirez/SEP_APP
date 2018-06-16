import { Component, OnInit} from '@angular/core';
import { CadenaService } from '../../../../services/services.index';
import { Router } from '@angular/router';
import { Cadena } from '../../../../models/cadena.models';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../../../models/usuario.model';


declare var AdminLTE: any;

@Component({
  selector: 'app-cadenas',
  templateUrl: './cadenas.component.html',
  styleUrls: ['./cadenas.component.css']
})
export class CadenasComponent implements OnInit {
  forma: FormGroup;

  constructor(
    public _cadenaServices: CadenaService,
    public router: Router
  ) { }

  ngOnInit() {
    AdminLTE.init();
    this.forma = new FormGroup({
      nombrecadena: new FormControl(null , Validators.required )
    });
  }

  actualizarCadena() {

  const cadena = new Cadena(
    this.forma.value.nombrecadena
  );
  this._cadenaServices.actualizarCadena(cadena )
        .subscribe( resp => this.router.navigate(['/dashboard']) );

  }

  estadoCadena(cadena) {

  }

  registarCadena() {
    const cadena = new Cadena(
      this.forma.value.nombrecadena
    );

    this._cadenaServices.crearCadena( cadena )
              .subscribe( resp => this.router.navigate(['/dashboard']) );

  }
}

