import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { EstadoService } from '../../../../services/services.index';
import { Router } from '@angular/router';
import { Estado } from '../../../../models/estado.models';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { spanish } from '../../../../interfaces/dataTables.es';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

declare var AdminLTE: any;

@Component({
  selector: 'app-creacion-estado',
  templateUrl: './creacion-estado.component.html',
  styleUrls: ['./creacion-estado.component.css']
})
export class CreacionEstadoComponent implements OnInit, OnDestroy {

  @ViewChild (DataTableDirective) dtElement: DataTableDirective;

  _id: string;
  nombre: string;
  disponible: boolean;

  forma: FormGroup;
  dtOptions: any = {};

  dtLanguage: any = spanish;
  estado: Estado[] = [];

  dtTrigger: Subject<any> = new Subject();

  constructor(
    public _estadoService: EstadoService,
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

    this.cargarEstados();

    this.forma = new FormGroup({
      nombreestado: new FormControl(null , Validators.required )
    });
  }

  cargarEstados() {
    this._estadoService.listarEstado().subscribe((res: any) => {

      console.log(res);
      this.estado = res.estados;
      this.dtTrigger.next();

    });
  }

  actualizarEstado() {
    const response = confirm('¿Deseas actualizar esta información?');
    if ( response ) {
    const newEstado = {
      _id: this._id,
      nombre: this.nombre,
    };

      this._estadoService.actualizarEstado(newEstado)
        .subscribe(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.cargarEstados();
          });
        });
    }
  }

  limpiar() {
    this.forma.reset();
  }

  registrarEstado() {
    const estado = new Estado(
      this.forma.value.nombreestado
    );

    this._estadoService.crearEstado(estado).subscribe(() => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.cargarEstados();
        this.limpiar();
      });
    });

  }

  llenarDatos(estado: Estado) {
    this._id = estado._id;
    this.nombre = estado.nombre;
  }

  actualizarDisponibilidad(est: Estado) {
    const response = confirm('¿Deseas actualizar la disponibilidad?');
    if ( response ) {
      if ( est.disponible ) {
        est.disponible = false;
      } else {
        est.disponible = true;
      }

      this._estadoService.actualizarDisponibilidad(est)
        .subscribe(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.cargarEstados();
          });
        });
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
