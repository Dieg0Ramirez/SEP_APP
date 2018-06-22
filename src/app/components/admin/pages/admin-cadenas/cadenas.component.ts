import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { CadenaService } from '../../../../services/services.index';
import { Router } from '@angular/router';
import { Cadena } from '../../../../models/cadena.models';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { spanish } from '../../../../interfaces/dataTables.es';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


declare var AdminLTE: any;

@Component({
  selector: 'app-cadenas',
  templateUrl: './cadenas.component.html',
  styleUrls: ['./cadenas.component.css']
})
export class CadenasComponent implements OnInit, OnDestroy {
  @ViewChild (DataTableDirective) dtElement: DataTableDirective;
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

    this.cargarCadenas();

    this.forma = new FormGroup({
      nombrecadena: new FormControl(null , Validators.required )
    });
  }

  cargarCadenas() {
    this._cadenaServices.listarCadena().subscribe((res: any) => {

      console.log(res);
      this.cadena = res.cadenas;
      this.dtTrigger.next();
    });
  }

  actualizarCadena() {

  const cadena = new Cadena(
    this.forma.value.nombrecadena
  );
  this._cadenaServices.actualizarCadena(cadena )
        .subscribe( () => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.cargarCadenas();
          });
        } );

  }

  registarCadena() {
    const cadena = new Cadena(
      this.forma.value.nombrecadena
    );

    this._cadenaServices.crearCadena(cadena)
      .subscribe(() => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.cargarCadenas();
        });
      });
  }

  actualizarDisponibilidad(cadena: Cadena) {
    const response = confirm('¿Deseas actualizar la disponibilidad?');
    if ( response ) {
      if ( cadena.disponible ) {
        cadena.disponible = false;
      } else {
        cadena.disponible = true;
      }

      this._cadenaServices.actualizarDisponibilidad(cadena)
        .subscribe(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.cargarCadenas();
          });
        });
    }

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

