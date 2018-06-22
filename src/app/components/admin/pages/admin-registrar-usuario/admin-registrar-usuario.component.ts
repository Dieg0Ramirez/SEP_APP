import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';

import { Subject } from 'rxjs';
import { spanish } from '../../../../interfaces/dataTables.es';

import swal from 'sweetalert';

import { UsuarioService } from '../../../../services/services.index';
import { Usuario } from '../../../../models/usuario.model';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-registrar-usuario',
  templateUrl: './admin-registrar-usuario.component.html',
  styleUrls: ['./admin-registrar-usuario.component.css']
})
export class AdminRegistrarUsuarioComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: any = {};

  dtLanguage: any = spanish;
  _id: string;
  nombre: string;
  email: string;
  password: string;
  rol: string;

  forma: FormGroup;
  usuario: Usuario[] = [];

  dtTrigger: Subject<any> = new Subject();


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

    this.cargarUsuarios();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      rol: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2') });

  }

  cargarUsuarios() {
    this._usuarioServices.listarUsuario().subscribe((res: any) => {

      this.usuario = res.usuarios;
      this.dtTrigger.next();
    });
  }

  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;

      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;

      }
      return {
        sonIguales: true
      };

    };
  }


  registrarUsuario() {

    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }


    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password,
      this.forma.value.rol
    );

    this._usuarioServices.crearUsuario(usuario)
      .subscribe(() => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.cargarUsuarios();
        });
      });
  }

  actualizarUsuario(usuario: Usuario) {
    const response = confirm('¿Deseas actualizar esta información');
    if ( response ) {
    const newUsuario = {
      _id: this._id,
      nombre: this.nombre,
      email: this.email,
      rol: this.rol,
      password: usuario.password
    };

      this._usuarioServices.actualizarUsuario(newUsuario)
        .subscribe(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.cargarUsuarios();
          });
        });
    }
  }

  llenarDatos(usuario: Usuario) {
    this._id = usuario._id;
    this.nombre = usuario.nombre;
    this.email = usuario.email;
    this.password = usuario.password;
    this.rol = usuario.rol;
  }

  actualizarDisponibilidad(usuario: Usuario) {
    const response = confirm('¿Deseas actualizar la disponibilidad?');
    if ( response ) {
      if ( usuario.disponible ) {
        usuario.disponible = false;
      } else {
        usuario.disponible = true;
      }

      this._usuarioServices.actualizarDisponibilidad(usuario)
        .subscribe(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.cargarUsuarios();
          });
        });
    }

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}

