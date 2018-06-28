import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { AlternativaService } from '../../../../services/services.index';
import { Alternativa } from '../../../../models/alternativa.models';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { spanish } from '../../../../interfaces/dataTables.es';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-alternativa-practica',
  templateUrl: './admin-alternativa-practica.component.html',
  styleUrls: ['./admin-alternativa-practica.component.css']
})
export class AdminAlternativaPracticaComponent implements OnInit, OnDestroy {
  @ViewChild (DataTableDirective) dtElement: DataTableDirective;

  forma: FormGroup;
  dtOptions: any = {};

  dtLanguage: any = spanish;
  alternativa: Alternativa[] = [];

  dtTrigger: Subject<any> = new Subject();

  _id: string;
  nombre: string;
  disponible: boolean;

  constructor(
    public _alternativaServices: AlternativaService,
    public router: Router) { }

  ngOnInit() {
    AdminLTE.init();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: this.dtLanguage,
      // Declare the use of the extension in the dom parameter
      // dom: 'lfBrtip',

      // Configure the buttons
      // buttons: [
      //   { extend: 'colvis', text: 'Ocultar/Mostrar Columnas' },
      //   { extend: 'copy', text: 'Copiar al portapapeles' },
      //   { extend: 'print', text: 'Imprimir' },
      //   { extend: 'excel', text: 'Exportar a Excel' },
      // ]
    };

    this.cargarAlternativas();

    this.forma = new FormGroup({
      nombrealternativa: new FormControl(null , Validators.required )
    });
  }

  cargarAlternativas() {
    this._alternativaServices.listarAlternativa().subscribe((res: any) => {
      console.log(res);
      this.alternativa = res.alternativas;
      this.dtTrigger.next();
    });
  }

  limpiar() {
    this.forma.reset();
  }

  actualizarAlternativa() {
    const response = confirm('¿Deseas actualizar esta información?');
    if (response) {
      const newAlternativa = {
        _id: this._id,
        nombre: this.nombre,
      };
      this._alternativaServices.actualizarAlternativa(newAlternativa)
        .subscribe(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.cargarAlternativas();
            this.limpiar();
          });
        });

    }
  }

  registarAlternativa() {
    const alternativa = new Alternativa(
      this.forma.value.nombrealternativa
    );

    this._alternativaServices.crearAlternativa(alternativa)
      .subscribe(() => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.cargarAlternativas();
          this.limpiar();
        });
      });
  }

  actualizarDisponibilidad(alternativa: Alternativa) {
    const response = confirm('¿Deseas actualizar la disponibilidad?');
    if ( response ) {
      if ( alternativa.disponible ) {
        alternativa.disponible = false;
      } else {
        alternativa.disponible = true;
      }

      this._alternativaServices.actualizarDisponibilidad(alternativa)
        .subscribe(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.cargarAlternativas();
          });
        });
    }

  }

  llenarDatos(alternativa: Alternativa) {
    this._id = alternativa._id;
    this.nombre = alternativa.nombre;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
