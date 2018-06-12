import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/services.index';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css']
})
export class LeftSideComponent implements OnInit {

  usuario: Usuario;
  constructor(
    public _usuarioServices: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioServices.usuario;
  }

}
