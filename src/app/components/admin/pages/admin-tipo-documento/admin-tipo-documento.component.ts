import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {FormGroup, FormControl, Validators, FormControlName} from '@angular/forms';

import { Subject } from 'rxjs';
import { spanish } from '../../../../interfaces/dataTables.es';

import swal from 'sweetalert';

import { TipoDocumentoService } from '../../../../services/services.index';
import { TipoDocumento } from '../../../../models/tipoDocumento.Models';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-tipo-documento',
  templateUrl: './admin-tipo-documento.component.html',
  styleUrls: ['./admin-tipo-documento.component.css']
})
export class AdminTipoDocumentoComponent implements OnInit {
  @ViewChild (DataTableDirective) dtElement: DataTableDirective;
  forma: FormGroup;
  dtOptions: any = {};

  dtLanguage: any = spanish;

  dtTrigger: Subject<any> = new Subject();

  tipoDocumento: TipoDocumento[] = [];
  _id: string;
  nombre: string;

  constructor(
    public _tipoDocumentoServices: TipoDocumentoService,
    public router: Router
  ) { }

  ngOnInit() {
    AdminLTE.init();

    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 10,
      language: this.dtLanguage,
      // Declare the use of the extension in the dom parameter
      // dom: 'lfBrtip',

      // // Configure the buttons
      // buttons: [
      //   { extend: 'colvis', text: 'Ocultar/Mostrar Columnas' },
      //   {
      //     extend: 'copy', text: 'Copiar al portapapeles'
      //   },
      //   { extend: 'print', text: 'Imprimir' },
      //   { extend: 'excel', text: 'Exportar a Excel' },
      // ]
    };

    this.cargarTipoDocumento();

    this.forma = new FormGroup({
      nombreTipoD: new FormControl(null , Validators.required )
    });
  }

  cargarTipoDocumento() {
    this._tipoDocumentoServices.listartipoDocumento().subscribe((res: any) => {

      console.log(res);
      this.tipoDocumento = res.tipoDocumento;
      this.dtTrigger.next();
    });
  }

  registarTipoDocumento() {
    const tipoD = new TipoDocumento(
      this.forma.value.nombreTipoD
    );

    this._tipoDocumentoServices.creartipoDocumento(tipoD)
      .subscribe(() => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.cargarTipoDocumento();
        });
      });
  }

  llenarDatos(tipoDocumento: TipoDocumento) {
    this._id = tipoDocumento._id;
    this.nombre = tipoDocumento.nombre;
  }
  actualizarTipoD() {
    const response = confirm('¿Deseas actualizar esta información?');
    if ( response ) {
    const newTipoD = {
      _id: this._id,
      nombre: this.nombre,
    // tslint:disable-next-line:no-unused-expression
    };

  this._tipoDocumentoServices.actualizartipoDocumento(newTipoD )
        .subscribe( () => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.cargarTipoDocumento();
          });
        } );

  }
}
actualizarDisponibilidad(tipoDocumento: TipoDocumento) {
  const response = confirm('¿Deseas actualizar la disponibilidad?');
  if ( response ) {
    if ( tipoDocumento.disponible ) {
      tipoDocumento.disponible = false;
    } else {
      tipoDocumento.disponible = true;
    }

    this._tipoDocumentoServices.actualizarDisponibilidad(tipoDocumento)
      .subscribe(() => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.cargarTipoDocumento();
          this.limpiar();
        });
      });
  }

}
limpiar() {
  this._id = '';
  this.nombre = '';
}



}
