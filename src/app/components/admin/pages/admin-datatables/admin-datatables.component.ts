import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/services.index';



declare var AdminLTE: any;

@Component({
  selector: 'app-admin-datatables',
  templateUrl: './admin-datatables.component.html',
  styleUrls: ['./admin-datatables.component.css']
})
export class AdminDatatablesComponent implements OnInit {
  usuarios: any [];

  dataTable: any[];

  constructor(
    public _usuarioServices: UsuarioService
    // public chRef: ChangeDetectorRef

  ) {}

  ngOnInit() {
  AdminLTE.init();
  //   this._usuarioServices.listarUsuario()
  //     .subscribe((data: any ) => {
  //       console.log(data);
  //      this.usuarios = data.object;

  //     // tendrás que esperar a que se produzca la detección de cambios y proyecte los datos en 
  //     // la plantilla html, puedes preguntar angular por eso ;-)
  //     this.chRef.detectChanges();

  //     // ahora puedes usar tablas de datos jquery:
  //     const table: any = $('table');
  //     this.dataTable = table.DataTable();
  //     });

  // }

  }
}

