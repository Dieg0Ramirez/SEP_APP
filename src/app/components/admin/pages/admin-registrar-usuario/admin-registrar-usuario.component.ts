import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators, FormControlName} from '@angular/forms';

import { Subject } from 'rxjs';
import { spanish } from '../../../../interfaces/dataTables.es';

import swal from 'sweetalert';

import { UsuarioService } from '../../../../services/services.index';
import { Usuario } from '../../../../models/usuario.model';
import { Router } from '@angular/router';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-registrar-usuario',
  templateUrl: './admin-registrar-usuario.component.html',
  styleUrls: ['./admin-registrar-usuario.component.css']
})
export class AdminRegistrarUsuarioComponent implements OnInit, OnDestroy {

  dtOptions: any = {};

  dtLanguage: any = spanish;

  forma: FormGroup;
  usuario: Usuario[] = [];

  dtTrigger: Subject<any> = new Subject();

  desde = 0;
  totalUsuarios = 0;

  constructor(
    public _usuarioServices: UsuarioService,
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

    this._usuarioServices.listarUsuario().subscribe(res => {

      console.log(res);

      this.usuario = res.data;
      this.dtTrigger.next();
    });

    this.cargarUsuarios();

    this.forma = new FormGroup({
      nombre: new FormControl(null , Validators.required ),
      email: new FormControl(null , [Validators.required , Validators.email]),
      password: new FormControl(null , Validators.required),
      password2: new FormControl(null , Validators.required),
      rol: new FormControl(null, Validators.required),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales('password', 'password2') }  );
  }

  cargarUsuarios() {
    this._usuarioServices.listarUsuario().subscribe((res: any) => {

      console.log(res);
      this.totalUsuarios = res.total;
      this.usuario = res.usuarios;

    });
  }

  sonIguales( campo1: string, campo2: string) {

    return (group: FormGroup ) => {
      const pass1 = group.controls[campo1].value;

      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;

      }
      return {
        sonIguales: true
      };

    };
  }


  registrarUsuario() {

    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }


    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password,
      this.forma.value.rol
    );

    this._usuarioServices.crearUsuario( usuario )
              .subscribe( resp => this.router.navigate(['/dashboard']) );
  }

  actualizarUsuario() {

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password,
      this.forma.value.rol
    );

    this._usuarioServices.crearUsuario( usuario )
              .subscribe( resp => this.router.navigate(['/dashboard']) );
  }

  buscarUsuario(termino: string) {
    console.log(termino);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

