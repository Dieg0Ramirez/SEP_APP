import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { ProgramaService, NivelFormacionService } from '../../../../services/services.index';
import { Router } from '@angular/router';
import { Programs } from '../../../../models/programs.models';
import { Subject } from 'rxjs';
import { spanish } from '../../../../interfaces/dataTables.es';
import { DataTableDirective } from 'angular-datatables';
import { NivelFormacion } from '../../../../models/nivelFormacion.models';


declare var AdminLTE: any;

@Component({
  selector: 'app-admin-programs',
  templateUrl: './admin-programs.component.html',
  styleUrls: ['./admin-programs.component.css']
})
export class AdminProgramsComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  nivelFormacion: string;
  nombre: string;
  _id: string;

  forma1: FormGroup;
  forma: FormGroup;

  dtOptions: any = {};
  dtLanguage: any = spanish;

  dtTrigger: Subject<any> = new Subject();

  programs: Programs[] = [];
  nivelFormacionn: NivelFormacion[] = [];

  constructor(
    public _programsServices: ProgramaService,
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
        { extend: 'copy', text: 'Copiar al portapapeles' },
        { extend: 'print', text: 'Imprimir' },
        { extend: 'excel', text: 'Exportar a Excel' },
      ]
    };

    this._nivelFormacionServices.listarNivelFormacion().subscribe((res: any) => {
      this.nivelFormacionn = res.nivelFormacion;
    });

    this.cargarProgramas();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      nivelFormacion: new FormControl(null, Validators.required)
    });

    this.forma1 = new FormGroup({
      nombre1: new FormControl(null, Validators.required),
      nivelFormacion1: new FormControl(null, Validators.required)
    });
  }

  limpiar() {
    this.forma.reset();
  }

  cargarProgramas() {
    this._programsServices.listarPrograms().subscribe((res: any) => {

      console.log(res);
      this.programs = res.programas;
      this.dtTrigger.next();
    });
  }

  registrarPrograms() {
    const programs = new Programs(
      this.forma.value.nombre,
      this.forma.value.nivelFormacion
    );

  console.log(programs);

    this._programsServices.crearPrograms(programs)
      .subscribe(() => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.cargarProgramas();
          this.limpiar();
        });
      });
  }

  actualizarDisponibilidad(program: Programs) {
    const response = confirm('¿Deseas actualizar la disponibilidad?');
    if ( response ) {
      if ( program.disponible ) {
        program.disponible = false;
      } else {
        program.disponible = true;
      }

      this._programsServices.actualizarDisponibilidad(program)
        .subscribe(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.cargarProgramas();
          });
        });
    }
  }

  actualizarPrograms(programs: Programs, nivelFormacion: NivelFormacion) {
    const response = confirm('¿Deseas actualizar esta información');
    if (response) {
      const newPrograms = {
        _id: this._id,
        nombre: this.nombre,
        nivelFormacion: this.nivelFormacion
      };
      console.log(newPrograms);

      this._programsServices.actualizarPrograms(newPrograms)
        .subscribe(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.cargarProgramas();
          });
        });
    }
  }

  llenarDatos(programs: Programs) {
    this._id = programs._id;
    this.nombre = programs.nombre;
    this.nivelFormacion = programs.nivelFormacion;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
