import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdminHomeComponent } from './components/admin/pages/admin-home/admin-home.component';
import { AdminProgramsComponent } from './components/admin/pages/admin-programs/admin-programs.component';

import { LoginComponent } from './components/login/login.component';
import { CadenasComponent } from './components/admin/pages/admin-cadenas/cadenas.component';
import { CreacionEstadoComponent } from './components/admin/pages/admin-creacion-estado/creacion-estado.component';
import { AdminRegistrarUsuarioComponent } from './components/admin/pages/admin-registrar-usuario/admin-registrar-usuario.component';
import { LoginGuardGuard } from './services/services.index';
import { AdminTipoDocumentoComponent } from './components/admin/pages/admin-tipo-documento/admin-tipo-documento.component';
import { AdminAprendicesComponent } from './components/admin/pages/admin-aprendices/admin-aprendices.component';
import { AdminSeguimientoComponent } from './components/admin/pages/admin-seguimiento/admin-seguimiento.component';
import { AdmiNivelFormacionComponent } from './components/admin/pages/admi-nivel-formacion/admi-nivel-formacion.component';
import { AdminEditarAprendicesComponent } from './components/admin/pages/admin-editar-aprendices/admin-editar-aprendices.component';
import { AdminFichasComponent } from './components/admin/pages/admin-fichas/admin-fichas.component';
import { AdminExcelContratosComponent } from './components/admin/pages/admin-excel-contratos/admin-excel-contratos.component';
// tslint:disable-next-line:max-line-length
import { AdminExcelJuiciosEvaluativosComponent } from './components/admin/pages/admin-excel-juicios-evaluativos/admin-excel-juicios-evaluativos.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
      {
        path: '',
        redirectTo: 'admin-home',
        pathMatch: 'full'
      },
      {
        path: 'admin-home',
        component: AdminHomeComponent
      },
      {
        path: 'admin-programs',
        component: AdminProgramsComponent
      },
      {
        path: 'admin-registrar',
        component: AdminRegistrarUsuarioComponent

      },
      {
        path: 'admin-programs',
        component: AdminProgramsComponent
      },
      {
        path: 'admin-cadenas',
        component: CadenasComponent
      },
      {
        path: 'admin-creacionEstado',
        component: CreacionEstadoComponent
      },
      {
        path: 'admin-documentos',
        component: AdminTipoDocumentoComponent
      },
      {
        path: 'admin-aprendices',
        component: AdminAprendicesComponent
      },
      {
        path: 'admin-seguimiento',
        component: AdminSeguimientoComponent
      },
      {
        path: 'admin-nivelFormacion',
        component: AdmiNivelFormacionComponent
      },
      {
        path: 'admin-editar-aprendices',
        component: AdminEditarAprendicesComponent

      },
      {
        path: 'admin-fichas',
        component: AdminFichasComponent
      },
      {
        path: 'admin-excel-contratos',
        component: AdminExcelContratosComponent
      },
      {
        path: 'admin-excel-juicios-evaluativos',
        component: AdminExcelJuiciosEvaluativosComponent

      }
    ]
  },
  { path: 'login', component: LoginComponent },
  {
    path: '**',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
