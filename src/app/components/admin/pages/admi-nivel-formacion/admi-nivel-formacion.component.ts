import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators, FormControlName} from '@angular/forms';

import { Subject } from 'rxjs';
import { spanish } from '../../../../interfaces/dataTables.es';

import { DataTableDirective } from 'angular-datatables';

import { NivelFormacionService } from '../../../../services/services.index';
import { NivelFormacion } from '../../../../models/nivelFormacion.Models';
import { Router } from '@angular/router';

declare var AdminLTE: any;

@Component({
  selector: 'app-admi-nivel-formacion',
  templateUrl: './admi-nivel-formacion.component.html',
  styleUrls: ['./admi-nivel-formacion.component.css']
})
export class AdmiNivelFormacionComponent implements OnInit, OnDestroy {
  @ViewChild (DataTableDirective) dtElement: DataTableDirective;
  forma: FormGroup;
  dtOptions: any = {};

  dtLanguage: any = spanish;

  dtTrigger: Subject<any> = new Subject();
  _id: string;
  nombre: string;

  nivelFormacion: NivelFormacion[] = [];

  constructor(
    public _nivelFormacionServices: NivelFormacionService,
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

    this.cargarNivelFormacion();

    this.forma = new FormGroup({
      nombreNivelFormacion: new FormControl(null , Validators.required )
    });
  }

  cargarNivelFormacion() {
    this._nivelFormacionServices.listarNivelFormacion().subscribe((res: any) => {
      this.nivelFormacion = res.nivelFormacion;
      this.dtTrigger.next();
    });
  }

  limpiar() {
    this.forma.reset();
  }

  actualizarNivelFormacion() {
    const response = confirm('¿Deseas actualizar esta información?');
    if (response) {
      const newNivelFormacion = {
        _id: this._id,
        nombre: this.nombre
      };
      this._nivelFormacionServices.actualizarNivelFormacion( newNivelFormacion ).subscribe(() => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.cargarNivelFormacion();
          this.limpiar();
        });
      });
    }
  }

  registarNivelFormacion() {
    const nivelFormacion = new NivelFormacion(this.forma.value.nombreNivelFormacion);

    this._nivelFormacionServices.crearNivelFormacion( nivelFormacion ).subscribe(() => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.cargarNivelFormacion();
        this.limpiar();
      });
    });
  }

  actualizarDisponibilidad(nivelFormacion: NivelFormacion) {
    const response = confirm('¿Deseas actualizar la disponibilidad?');
    if (response) {
      if (nivelFormacion.disponible) {
        nivelFormacion.disponible = false;
      } else {
        nivelFormacion.disponible = true;
      }

      this._nivelFormacionServices.actualizarDisponibilidad(nivelFormacion)
        .subscribe(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.cargarNivelFormacion();
          });
        });
    }

  }

  llenarDatos(nivelFormacion: NivelFormacion) {
    this._id = nivelFormacion._id;
    this.nombre = nivelFormacion.nombre;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
