import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdminHomeComponent } from './components/admin/pages/admin-home/admin-home.component';
import { AdminProgramsComponent } from './components/admin/pages/admin-programs/admin-programs.component';

import { LoginComponent } from './components/login/login.component';
import { CadenasComponent } from './components/admin/pages/admin-cadenas/cadenas.component';
import { CreacionEstadoComponent } from './components/admin/pages/admin-creacion-estado/creacion-estado.component';
// import { AdminRegistrarComponent} from './components/admin/pages/admin-registrar/admin-registrar.component';
import { AdminRegistrarUsuarioComponent } from './components/admin/pages/admin-registrar-usuario/admin-registrar-usuario.component';
import { LoginGuardGuard } from './services/services.index';
import { AdminTipoDocumentoComponent } from './components/admin/pages/admin-tipo-documento/admin-tipo-documento.component';
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
