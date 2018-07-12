import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { spanish } from '../../../../interfaces/dataTables.es';
import { DataTableDirective } from 'angular-datatables';
import { NivelFormacionService, TipoDocumentoService } from '../../../../services/services.index';
import { CadenaService } from '../../../../services/cadena/cadena.service';
import { ProgramaService } from '../../../../services/programa/programa.service';
import { EstadoService } from '../../../../services/estado/estado.service';
import { FichasService } from '../../../../services/fichas/fichas.service';
import { AlternativaService } from '../../../../services/alternativa/alternativa.service';
import { AprendizService } from '../../../../services/aprendiz/aprendiz.service';
import { Aprendiz } from '../../../../models/aprendiz.models';
import { TipoDocumento } from '../../../../models/tipoDocumento.Models';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-aprendices',
  templateUrl: './admin-aprendices.component.html',
  styleUrls: ['./admin-aprendices.component.css']
})
export class AdminAprendicesComponent implements OnInit, OnDestroy {
  alternavivaPractica: any;
  correo: any;
  telefono: any;
  celular: any;
  @ViewChild (DataTableDirective) dtElement: DataTableDirective;
  
  //Datos
  alternativa: string;
  estado: string;
  ficha: string;
  apellido: string;
  nombre: string;
  numeroDocumento: string;
  tipoDocumento: string;
  _id: string;
  
  forma: FormGroup;
  dtOptions: any = {};
  dtLanguage: any = spanish;
  dtTrigger: Subject<any> = new Subject();
  
  alternativas: any;
  fichas: any;
  estados: any;
  tipodocument: any;
  
  cadenaFormacion: any;
  nivelFormacion: any;
  programa: any;
  
  filtros: Aprendiz[] = [];  

  constructor(
    public _apredizServices: AprendizService,
    public _cadenaServices: CadenaService,
    public _nivelFormacionServices: NivelFormacionService,
    public _programaServices: ProgramaService,
    public _estadoServices: EstadoService,
    public _fichaServices: FichasService,
    public _alternativaP: AlternativaService,
    public _tipoDocumento: TipoDocumentoService,
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
    this.listarTipoDocumento();
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
      this.estados = res.estados;
    });
  }
  listarFicha() {
    this._fichaServices.listarFicha().subscribe((res: any) => {
      this.fichas = res.fichas;
    });
  }
  listarAlternatica() {
    this._alternativaP.listarAlternativa().subscribe((res: any) => {
      this.alternativas = res.alternativas;
    });
  }

  listarTipoDocumento() {
    this._tipoDocumento.listartipoDocumento().subscribe((res: any) => {
      this.tipodocument = res.tipoDocumento;
    });
  }

  actualizarAprendices() {
    const response = confirm('¿Deseas actualizar esta información');
    if (response) {
      const newAprendiz = {
        _id: this._id,
        tipoDocumento: this.tipoDocumento,
        numeroDocumento: this.numeroDocumento,
        nombre: this.nombre,
        apellido: this.apellido,
        ficha: this.ficha,
        estado: this.estado,
        alternativa: this.alternativa,

        //Agregue las siguientes variables por que si no me salia error en (this._apredizServices.actualizarAprendices(newAprendiz))
        celular: this.celular,
        telefono: this.telefono,
        correo: this.correo,
        nivelFormacion: this.nivelFormacion,
        programa: this.programa,
        alternativaPractica: this.alternavivaPractica
      };

      this._apredizServices.actualizarAprendices(newAprendiz)
        .subscribe(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.listarAprendiz();
          });
        });
    }
  }

  llenarAprendiz(filtros: any) {
    this._id = filtros._id;
    this.tipoDocumento = filtros.tipoDocumento._id;
    this.numeroDocumento = filtros.numeroDocumento;
    this.nombre = filtros.nombre;
    this.apellido = filtros.apellido;
    this.ficha = filtros.ficha._id; 
    this.estado = filtros.estado._id;
    this.alternativa = filtros.alternativa._id;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
