import { Routes } from '@angular/router';
import { NuevaIncidenciaComponent } from './pages/usuarios/nueva-incidencia/nueva-incidencia.component';
import { ListaIncidenciasComponent } from './pages/usuarios/lista-incidencias/lista-incidencias.component';
import { UsuariosAdminComponent } from './pages/admin/usuarios-admin/usuarios-admin.component';
import { TiposAdminComponent } from './pages/admin/tipos-admin/tipos-admin.component';
import { IncidenciasAdminComponent } from './pages/admin/incidencias-admin/incidencias-admin.component';
import { UsuariosSuperComponent } from './pages/superadmin/usuarios-super/usuarios-super.component';
import { TiposSuperComponent } from './pages/superadmin/tipos-super/tipos-super.component';
import { IncidenciasSuperComponent } from './pages/superadmin/incidencias-super/incidencias-super.component';
import { isAuthenticatedGuard } from '../../../shared/guards/is-authenticated.guard';
import { ListaGuardiasLocalizadasComponent } from './pages/usuarios/lista-guardias-localizadas/lista-guardias-localizadas.component';
import { GuardiasAdminComponent } from './pages/admin/guardias-admin/guardias-admin.component';
import { GuardiasSuperComponent } from './pages/superadmin/guardias-super/guardias-super.component';
import { GruposServiciosSuperComponent } from './pages/superadmin/grupos-servicios-super/grupos-servicios-super.component';
import { roleGuard } from '../../../shared/guards/role.guard';

export const REGIN_ROUTES: Routes = [
  { path: '', redirectTo: 'usuario/nueva-incidencia', pathMatch: 'full' },
  {
    path: 'usuario/nueva-incidencia',
    component: NuevaIncidenciaComponent,
  },
  {
    path: 'usuario/incidencias',
    component: ListaIncidenciasComponent,
  },
  {
    path: 'usuario/guardias-localizadas',
    component: ListaGuardiasLocalizadasComponent,
  },
  {
    path: 'administrador/usuarios',
    component: UsuariosAdminComponent,
    canActivate: [roleGuard],
    data: { roles: [2, 3] },
  },
  {
    path: 'administrador/tipos-subtipos',
    component: TiposAdminComponent,
    canActivate: [roleGuard],
    data: { roles: [2, 3] },
  },
  {
    path: 'administrador/incidencias',
    component: IncidenciasAdminComponent,
    canActivate: [roleGuard],
    data: { roles: [2, 3] },
  },
  {
    path: 'administrador/guardias-localizadas',
    component: GuardiasAdminComponent,
    canActivate: [roleGuard],
    data: { roles: [2, 3] },
  },
  {
    path: 'super/usuarios',
    component: UsuariosSuperComponent,
    canActivate: [roleGuard],
    data: { roles: [3] },
  },
  {
    path: 'super/tipos-subtipos',
    component: TiposSuperComponent,
    canActivate: [roleGuard],
    data: { roles: [3] },
  },
  {
    path: 'super/grupos-servicios',
    component: GruposServiciosSuperComponent,
    canActivate: [roleGuard],
    data: { roles: [3] },
  },
  {
    path: 'super/incidencias',
    component: IncidenciasSuperComponent,
    canActivate: [roleGuard],
    data: { roles: [3] },
  },
  {
    path: 'super/guardias-localizadas',
    component: GuardiasSuperComponent,
    canActivate: [roleGuard],
    data: { roles: [3] },
  },
];
