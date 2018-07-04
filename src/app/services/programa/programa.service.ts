import { Injectable } from '@angular/core';
import { Programs } from '../../models/programs.models';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { DataTablesResponse } from '../../models/tablaModels';
import { AlertifyService } from '../alertify/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  constructor( public http: HttpClient,
  public _usuarioServices: UsuarioService,
  public alertify: AlertifyService) { }

  crearPrograms(programs: Programs) {
    let url = URL_API + '/programa';
    url += '/?token=' + this._usuarioServices.token;

    return this.http.post(url, programs).pipe(
      map((resp: any) => {
        this.alertify.success('Programa creado con éxito');
    }));
  }

  actualizarPrograms(programs: Programs) {
    let url = URL_API + '/programa/' + programs._id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.put(url, programs).pipe(
      map((resp: any) => {
        this.alertify.success('Programa actualizado con éxito');
      }));
  }

  listarPrograms() {
    let url = URL_API + '/programa';
    url += '?token=' + this._usuarioServices.token;
    return this.http.get<DataTablesResponse>(url);
  }

  actualizarDisponibilidad(program: Programs) {
    let url = URL_API + '/programa/disponible/' + program._id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.put(url, program ).pipe(
      map((resp: any) => {
        this.alertify.success('disponibilidad actualizada');
        return resp.Programs;
      }));
  }
}
