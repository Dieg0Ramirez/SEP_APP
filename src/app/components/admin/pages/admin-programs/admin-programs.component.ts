import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { ProgramaService } from '../../../../services/services.index';
import { Router } from '@angular/router';
import { Programs } from '../../../../models/programs.models';

import swal from 'sweetalert';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-programs',
  templateUrl: './admin-programs.component.html',
  styleUrls: ['./admin-programs.component.css']
})
export class AdminProgramsComponent implements OnInit {
  
  forma: FormGroup;
  programs: Programs[] = [];
  desde = 0;
  totalPrograms = 0;

  constructor(
    public _programsServices: ProgramaService,
    public router: Router
  ) { }

  ngOnInit() {
    AdminLTE.init();

    this.cargarProgramas();

    this.forma = new FormGroup({
      nombre: new FormControl(null , Validators.required ),
      nivelFormacion: new FormControl(null , Validators.required )
    });
  }

  cargarProgramas() {
    this._programsServices.listarPrograms(this.desde).subscribe((res: any) => {

      console.log(res);
      this.totalPrograms = res.total;
      this.programs = res.programas;

    });
  }

  cambiarDesde(valor: number) {

    let desd = 0;
    desd = this.desde + valor;
    if ( desd >= this.totalPrograms ) {
      return;
    }
    if ( desd < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarProgramas();

  }

  registrarPrograms() {

    if ( this.forma.invalid ) {
      return;
    }

    const programs = new Programs(
      this.forma.value.nombre,
      this.forma.value.nivelFormacion
    );

    this._programsServices.crearPrograms( programs )
              .subscribe( resp => this.router.navigate(['/']) );
  }


}
