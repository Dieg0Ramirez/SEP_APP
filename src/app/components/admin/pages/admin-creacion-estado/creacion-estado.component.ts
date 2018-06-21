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
    const estado = new Estado(
      this.forma.value.nombreestado
    );
    this._estadoService.actualizarEstado(estado).subscribe(() => {

      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.cargarEstados();
      });
    });
  }

  registrarEstado() {
    const estado = new Estado(
      this.forma.value.nombreestado
    );

    this._estadoService.crearEstado(estado).subscribe(() => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.cargarEstados();
      });
    });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
