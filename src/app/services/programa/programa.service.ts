import { Injectable } from '@angular/core';
import { Programs } from '../../models/programs.models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_API } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  programs: Programs;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {}

  crearPrograms(programs: Programs) {
    let url = URL_API + '/programa';
    url += '/?token=' + this.token;
    return this.http.post(url, programs).pipe(
      map((resp: any) => {
        swal('Programa creado', programs.nombre, 'success');
        return resp.Programs;
      }));
  }

  actualizarPrograms(programs: Programs) {
    let url = URL_API + '/programa' + programs._id;
    url += '?token=' + this.token;
    return this.http.put(url, programs).pipe(
      map((resp: any) => {
        swal('Programa actualizado', programs.nombre, 'success');
        return resp.Programs;
      }));
  }

  listarPrograms() {
    let url = URL_API + '/programa';
    url += '?token=' + this.token;
    return this.http.get(url);
  }
}
