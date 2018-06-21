import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { ProgramaService } from '../../../../services/services.index';
import { Router } from '@angular/router';
import { Programs } from '../../../../models/programs.models';
import { Subject } from 'rxjs';
import { spanish } from '../../../../interfaces/dataTables.es';



declare var AdminLTE: any;

@Component({
  selector: 'app-admin-programs',
  templateUrl: './admin-programs.component.html',
  styleUrls: ['./admin-programs.component.css']
})
export class AdminProgramsComponent implements OnInit {
  forma: FormGroup;
  dtOptions: any = {};

  dtLanguage: any = spanish;
  programs: Programs[] = [];
  dtTrigger: Subject<any> = new Subject();


  constructor(
    public _programsServices: ProgramaService,
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

    this._programsServices.listarPrograms().subscribe(res => {

      console.log(res);

      this.programs = res.data;
      this.dtTrigger.next();
    });

    this.cargarProgramas();

    this.forma = new FormGroup({
      nombre: new FormControl(null , Validators.required ),
      nivelFormacion: new FormControl(null , Validators.required )
    });
  }

  cargarProgramas() {
    this._programsServices.listarPrograms().subscribe((res: any) => {

      console.log(res);
      this.programs = res.programas;

    });
  }

  registrarPrograms() {

    const programs = new Programs(
      this.forma.value.nombre,
      this.forma.value.nivelFormacion
    );

    this._programsServices.crearPrograms( programs )
              .subscribe( resp => this.router.navigate(['/admin/admin-programs']) );
  }


}
