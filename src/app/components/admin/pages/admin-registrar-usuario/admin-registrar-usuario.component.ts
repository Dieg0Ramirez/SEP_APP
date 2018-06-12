import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormControlName} from '@angular/forms';


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
export class AdminRegistrarUsuarioComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioServices: UsuarioService,
    public router: Router
  ) { }
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

  ngOnInit() {
    AdminLTE.init();

    this.forma = new FormGroup({
      nombre: new FormControl(null , Validators.required ),
      email: new FormControl(null , [Validators.required , Validators.email]),
      password: new FormControl(null , Validators.required),
      password2: new FormControl(null , Validators.required),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales('password', 'password2') }  );
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
      this.forma.value.password
    );

    this._usuarioServices.crearUsuario( usuario )
              .subscribe( resp => this.router.navigate(['/dashboard']) );
  }

  actualizarUsuario() {

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    this._usuarioServices.crearUsuario( usuario )
              .subscribe( resp => this.router.navigate(['/dashboard']) );
  }
}

