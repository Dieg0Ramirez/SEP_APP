import { Component, OnInit} from '@angular/core';
import { CadenaService } from '../../../../services/services.index';
import { Router } from '@angular/router';
import { Cadena } from '../../../../models/cadena.models';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { spanish } from '../../../../interfaces/dataTables.es';
import { Subject } from 'rxjs';


declare var AdminLTE: any;

@Component({
  selector: 'app-cadenas',
  templateUrl: './cadenas.component.html',
  styleUrls: ['./cadenas.component.css']
})
export class CadenasComponent implements OnInit {
  forma: FormGroup;
  dtOptions: any = {};

  dtLanguage: any = spanish;
  cadena: Cadena[] = [];

  dtTrigger: Subject<any> = new Subject();

  constructor(
    public _cadenaServices: CadenaService,
    public router: Router
  ) { }

  ngOnInit() {
    AdminLTE.init();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: this.dtLanguage,
      // Declare the use of the extension in the dom parameter
      dom: 'lfBrtip',

      // Configure the buttons
      buttons: [
        { extend: 'colvis', text: 'Ocultar/Mostrar Columnas' },
        {
          extend: 'copy', text: 'Copiar al portapapeles'
        },
        { extend: 'print', text: 'Imprimir' },
        { extend: 'excel', text: 'Exportar a Excel' },
      ]
    };

    this._cadenaServices.listarCadena().subscribe(res => {

      console.log(res);

      this.cadena = res.data;
      this.dtTrigger.next();
    });

    this.cargarCadenas();

    this.forma = new FormGroup({
      nombrecadena: new FormControl(null , Validators.required )
    });
  }

  cargarCadenas() {
    this._cadenaServices.listarCadena().subscribe((res: any) => {

      console.log(res);
      this.cadena = res.cadenas;

    });
  }

  actualizarCadena() {

  const cadena = new Cadena(
    this.forma.value.nombrecadena
  );
  this._cadenaServices.actualizarCadena(cadena )
        .subscribe( resp => this.router.navigate(['admin/admin-cadenas']) );

  }

  registarCadena() {
    const cadena = new Cadena(
      this.forma.value.nombrecadena
    );

    this._cadenaServices.crearCadena( cadena )
              .subscribe( resp => this.router.navigate(['/admin/admin-cadenas']) );

  }
}

