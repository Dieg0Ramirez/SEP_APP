import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API, URL_SOCKET } from '../../config/config';
import { Subject, Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private urlSocket = URL_SOCKET;
  private socket;

  constructor(private http: HttpClient) { }

  uploadExcelJuiciosEvaluativos(nivelFormacion: string, files: Array<File>) {

    const url = URL_API + '/excel/juicios/' + nivelFormacion;

    // tslint:disable-next-line:prefer-const
    let formData: any = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name);
    }

    return this.http.post(url, formData);

  }

  processRowExcel() {
    // tslint:disable-next-line:prefer-const
    let observable = new Observable(observer => {
      this.socket = io(this.urlSocket);
      this.socket.on('processRowExcelAprendices', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }


  processFullExcel() {
    // tslint:disable-next-line:prefer-const
    let observable = new Observable(observer => {
      this.socket = io(this.urlSocket);
      this.socket.on('processFullExcelAprendices', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
