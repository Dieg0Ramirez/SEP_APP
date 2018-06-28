import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { spanish } from '../../../../interfaces/dataTables.es';
import { DataTableDirective } from 'angular-datatables';
import { NivelFormacionService } from '../../../../services/services.index';
import { CadenaService } from '../../../../services/cadena/cadena.service';
import { ProgramaService } from '../../../../services/programa/programa.service';
import { EstadoService } from '../../../../services/estado/estado.service';
import { FichasService } from '../../../../services/fichas/fichas.service';
import { AlternativaService } from '../../../../services/alternativa/alternativa.service';
import { AprendizService } from '../../../../services/aprendiz/aprendiz.service';
import { Aprendiz } from '../../../../models/aprendiz.models';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-aprendices',
  templateUrl: './admin-aprendices.component.html',
  styleUrls: ['./admin-aprendices.component.css']
})
export class AdminAprendicesComponent implements OnInit, OnDestroy {
  @ViewChild (DataTableDirective) dtElement: DataTableDirective;
  forma: FormGroup;
  dtOptions: any = {};
  cadenaFormacion: string;
  dtLanguage: any = spanish;
  dtTrigger: Subject<any> = new Subject();
  nivelFormacion: any;
  programa: any;
  estado: any;
  fichas: any;
  alternativaPractica: any;
  filtros: Aprendiz[] = [];

  constructor(
    public _apredizServices: AprendizService,
    public _cadenaServices: CadenaService,
    public _nivelFormacionServices: NivelFormacionService,
    public _programaServices: ProgramaService,
    public _estadoServices: EstadoService,
    public _fichaServices: FichasService,
    public _alternativaP: AlternativaService,
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
    },
    this.forma = new FormGroup({
      cadenaFormacion: new FormControl(null, Validators.required),
      programa: new FormControl(null, Validators.required),
      nivelFormacion: new FormControl(null, Validators.required),
      ficha: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
      alternativaPractica: new FormControl(null, Validators.required)
    });

    this.listarAprendiz();
    this.listarNivelF();
    this.listarCadena();
    this.listarprograma();
    this.listarEstado();
    this.listarFicha();
    this.listarAlternatica();
  }
  listarAprendiz() {
    this._apredizServices.listarApredices().subscribe((res: any) => {
      console.log(res);
      this.filtros = res.aprendiz;
      this.dtTrigger.next();
    });
  }

  listarNivelF() {
    this._nivelFormacionServices.listarNivelFormacion().subscribe((res: any) => {
      this.nivelFormacion = res.nivelFormacion;
    });
  }
  listarCadena() {
    this._cadenaServices.listarCadena().subscribe((res: any) => {
      this.cadenaFormacion = res.cadenas;
    });
  }

  listarprograma() {
    this._programaServices.listarPrograms().subscribe((res: any) => {
      this.programa = res.programas;
    });
  }
  listarEstado() {
    this._estadoServices.listarEstado().subscribe((res: any) => {
      this.estado = res.estados;
    });
  }
  listarFicha() {
    this._fichaServices.listarFicha().subscribe((res: any) => {
      this.fichas = res.fichas;
    });
  }
  listarAlternatica() {
    this._alternativaP.listarAlternativa().subscribe((res: any) => {
      this.alternativaPractica = res.alternativas;
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
