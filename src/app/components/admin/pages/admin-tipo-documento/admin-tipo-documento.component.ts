import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators, FormControlName} from '@angular/forms';

import { Subject } from 'rxjs';
import { spanish } from '../../../../interfaces/dataTables.es';

import swal from 'sweetalert';

import { TipoDocumentoService } from '../../../../services/services.index';
import { TipoDocumento } from '../../../../models/tipoDocumento.Models';
import { Router } from '@angular/router';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-tipo-documento',
  templateUrl: './admin-tipo-documento.component.html',
  styleUrls: ['./admin-tipo-documento.component.css']
})
export class AdminTipoDocumentoComponent implements OnInit {

  dtOptions: any = {};

  dtLanguage: any = spanish;

  dtTrigger: Subject<any> = new Subject();

  tipoDocumento: TipoDocumento[] = [];

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
  }

  cargarTipoDocumento() {
    this._tipoDocumentoServices.listartipoDocumento().subscribe((res: any) => {

      console.log(res);
      this.tipoDocumento = res.tipoDocumento;
      this.dtTrigger.next();
    });
  }


}
