import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import { Estado } from '../../models/estado.models';
import { DataTablesResponse } from '../../models/tablaModels';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor( public http: HttpClient,
  public _usuarioServices: UsuarioService ) { }

crearEstado( estado: Estado) {
  let url = URL_API + '/estado';
  url += '?token=' + this._usuarioServices.token;

  return this.http.post(url , estado).pipe(
    map((resp: any) => {
      console.log(resp);
    }));

  }

  actualizarEstado(estado: Estado) {
    let url = URL_API + '/estado' + estado._id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.put(url , estado );
  }

  listarEstado() {
    let url = URL_API + '/estado';
    url += '?token=' + this._usuarioServices.token;
    return this.http.get<DataTablesResponse>(url);

    }
}