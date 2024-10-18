import { Routes } from '@angular/router';
// Add this import:
import { loadRemoteModule } from '@angular-architects/native-federation';
import { LoginComponent } from './auth/login/login.component';
import { isNotAuthenticatedGuard } from '../../../shared/guards/is-not-authenticated.guard';
import { isAuthenticatedGuard } from '../../../shared/guards/is-authenticated.guard';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './home/pages/user/user.component';
import { AppsHospitalComponent } from './home/pages/apps-hospital/apps-hospital.component';
import { PhonesComponent } from './home/pages/phones/phones.component';
import { ServicesComponent } from './home/pages/services/services.component';

export const routes: Routes = [
  {
    canActivate: [isAuthenticatedGuard],
    path: 'regin',
    loadComponent: () =>
      loadRemoteModule('regin', './Component').then((m) => m.AppComponent),
    loadChildren: () =>
      import('../../../regin/src/app/app.routes').then((m) => m.REGIN_ROUTES),
  },
  {
    canActivate: [isNotAuthenticatedGuard],
    path: 'login',
    component: LoginComponent,
  },
  {
    canActivate: [isAuthenticatedGuard],
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'usuario',
        component: UserComponent,
      },
      {
        path: 'aplicaciones',
        component: AppsHospitalComponent,
      },
      {
        path: 'telefonos',
        component: PhonesComponent,
      },
      {
        path: 'servicios',
        component: ServicesComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
