import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { } from 'jquery';
// import { } from 'icheck';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  checkbox_icheck: HTMLElement = document.getElementById('checkbox_icheck');

  constructor(
    public _usuarioServices: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    // add the the body classes
    this.body.classList.add('hold-transition');
    this.body.classList.add('login-page');

    // jQuery(this.checkbox_icheck).iCheck({
    //   checkboxClass: 'icheckbox_square-blue',
    //   radioClass: 'iradio_square-blue',
    //   increaseArea: '20%' /* optional */
    // });
  }

   ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('hold-transition');
    this.body.classList.remove('login-page');
  }
  login(forma: NgForm) {
    if ( forma.invalid ) {
      return;
    }

<<<<<<< HEAD
    const usuario = new Usuario( null, forma.value.email, forma.value.password);
=======
    const usuario = new Usuario( null, forma.value.email, forma.value.password );
>>>>>>> 3b19f6569a202b49970b32b82e4b546c4e73c38a
    this._usuarioServices.login( usuario )
                  .subscribe(resp => this.router.navigate(['/admin']));

  }

}
