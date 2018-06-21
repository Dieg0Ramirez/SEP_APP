import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { NivelFormacionService } from '../../../../services/services.index';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { spanish } from '../../../../interfaces/dataTables.es';
import { DataTableDirective } from 'angular-datatables';
import { NivelFormacion } from '../../../../models/nivelFormacion.models';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-excel-juicios-evaluativos',
  templateUrl: './admin-excel-juicios-evaluativos.component.html',
  styleUrls: ['./admin-excel-juicios-evaluativos.component.css']
})
export class AdminExcelJuiciosEvaluativosComponent implements OnInit, OnDestroy {
  @ViewChild (DataTableDirective) dtElement: DataTableDirective;
  forma: FormGroup;
  dtOptions: any = {};

  dtLanguage: any = spanish;
  dtTrigger: Subject<any> = new Subject();

  nivelFormacion: NivelFormacion[] = [];

  constructor(
    public _nivelFormacionServices: NivelFormacionService,
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

    this._nivelFormacionServices.listarNivelFormacion().subscribe((res: any) => {

      console.log(res);
      this.nivelFormacion = res.nivelFormacion;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
