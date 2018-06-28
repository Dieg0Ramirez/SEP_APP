import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
import { DataTablesResponse } from '../../models/tablaModels';

@Injectable({
  providedIn: 'root'
})
export class FichasService {

  constructor(
    public _usuarioServices: UsuarioService,
    public http: HttpClient
  ) { }

  listarFicha() {
    let url = URL_API + '/ficha';
    url += '?token=' + this._usuarioServices.token;
    return this.http.get<DataTablesResponse>(url);
    }
}
