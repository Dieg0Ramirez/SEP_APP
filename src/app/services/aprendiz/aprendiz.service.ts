import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
import { DataTablesResponse } from '../../models/tablaModels';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AprendizService {


  constructor(
    public http: HttpClient,
    public _usuarioServices: UsuarioService
  ) { }

  listarApredices() {
    let url = URL_API + '/aprendiz';
    url += '?token=' + this._usuarioServices.token;
    return this.http.get<DataTablesResponse>(url);
  }


}
