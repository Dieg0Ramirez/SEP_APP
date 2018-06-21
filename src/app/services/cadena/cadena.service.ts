import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import { Cadena } from '../../models/cadena.models';
import { DataTablesResponse } from '../../models/tablaModels';

@Injectable({
  providedIn: 'root'
})
export class CadenaService {

  constructor( public http: HttpClient,
  public _usuarioServices: UsuarioService ) { }

crearCadena( cadena: Cadena) {
  let url = URL_API + '/cadena';
  url += '?token=' + this._usuarioServices.token;

  return this.http.post(url , cadena).pipe(
    map((resp: any) => {
      console.log(resp);
    }));

  }

  actualizarCadena(cadena: Cadena) {
    let url = URL_API + '/cadena' + cadena._id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.put(url , cadena );
  }

  listarCadena() {
    let url = URL_API + '/cadena';
    url += '?token=' + this._usuarioServices.token;
    return this.http.get<DataTablesResponse>(url);

    }
}
