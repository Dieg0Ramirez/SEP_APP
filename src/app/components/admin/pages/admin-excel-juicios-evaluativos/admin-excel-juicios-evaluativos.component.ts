import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { NivelFormacionService } from '../../../../services/services.index';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { spanish } from '../../../../interfaces/dataTables.es';
import { DataTableDirective } from 'angular-datatables';
import { NivelFormacion } from '../../../../models/nivelFormacion.models';
import { ExcelService } from '../../../../services/excel/excel.service';
import { AlertifyService } from './../../../../services/alertify/alertify.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-excel-juicios-evaluativos',
  templateUrl: './admin-excel-juicios-evaluativos.component.html',
  styleUrls: ['./admin-excel-juicios-evaluativos.component.css']
})
export class AdminExcelJuiciosEvaluativosComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  excelForm: FormGroup;

  dtOptions: any = {};
  dtLanguage: any = spanish;
  dtTrigger: Subject<any> = new Subject();

  nivelFormacion: NivelFormacion[] = [];

  validExcelExtension = 3;
  filesToUpload: Array<File>;
  validExcel = 0;

  displayData = false;
  aprendices = [];
  informacionGeneral = {
    centro: '',
    fechaFin: '',
    fechaInicio: '',
    ficha: '',
    modalidad: '',
    programa: '',
    NivelFormacion: ''
  };
  connection;

  constructor(
    public _nivelFormacionServices: NivelFormacionService,
    public router: Router,
    public excelService: ExcelService,
    public alertify: AlertifyService
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
      this.nivelFormacion = res.nivelFormacion;
    });

    this.excelForm = new FormGroup({
      nivelFormacion: new FormControl(null, Validators.required)
    });

    this.connection = this.excelService.processFullExcel().subscribe((data: any) => {
      this.aprendices = data.aprendices;
      this.displayData = true;
      this.informacionGeneral.ficha = data.ficha;
      this.informacionGeneral.fechaInicio = data.fechaInicio;
      this.informacionGeneral.fechaFin = data.fechaFin;
      this.informacionGeneral.programa = data.programa;
      this.informacionGeneral.modalidad = data.modalidad;
      this.informacionGeneral.centro = data.centro;
      setTimeout(() => {
        this.dtTrigger.next();
      });
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  subir() {
    this.excelService.uploadExcelJuiciosEvaluativos(this.excelForm.value.nivelFormacion, this.filesToUpload).subscribe((res: any) => {
      this.alertify.success('Los datos se estan procesando correctamente');
    }, (err) => {
      console.log(err);
      this.alertify.error('Uppss!! Ocurrio un error tratando de subir los datos');
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    // tslint:disable-next-line:prefer-const
    let file = this.filesToUpload[0];
    // tslint:disable-next-line:prefer-const
    let fileArray = file.name.split('.');
    // tslint:disable-next-line:prefer-const
    let extension = fileArray[fileArray.length - 1];

    if (extension === 'xlsx' || extension === 'xls') {
      console.log(file.size);
      if (file.size < 8000000) {
        this.validExcelExtension = 0;

      } else {
        this.validExcelExtension = 2;
      }
    } else {
      this.validExcelExtension = 1;
    }
  }

}
