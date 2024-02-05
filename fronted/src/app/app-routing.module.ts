import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './components/page/inicio/inicio.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageComponent } from './components/page/page.component';
import { ListadoComponent } from './components/page/rutina/listado/listado.component';
import { CrearComponent } from './components/page/rutina/crear/crear.component';
import { ActualizarComponent } from './components/page/rutina/actualizar/actualizar.component';
import { ListadoEjerciciosComponent } from './components/page/ejercicios/listado/listado.component';
import { CrearEjercicioComponent } from './components/page/ejercicios/crear/crear.component';
import { ActualizarEjercicioComponent } from './components/page/ejercicios/actualizar/actualizar.component';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'auth',
    component: PageComponent,
    canActivate: [canActivateGuard], //Anclamos la función del canActive
    canMatch: [canMatchGuard],
    
    children: [
      {

        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'listado-rutina',
        component: ListadoComponent
      },
      {
          path: 'crear-rutina',
          component: CrearComponent,
      },
      {
          path: 'actualizar-rutina/:id',
          component: ActualizarComponent
      },
      {
        path: ':id/listado-ejercicios',
        component: ListadoEjerciciosComponent
      },
      {
        path: ':id/crear-ejercicio',
        component: CrearEjercicioComponent
      },
      {
        path: ':id/actualizar-ejercicio/:idEjercicio',
        component: ActualizarEjercicioComponent
      },
      {
        path: '**',
        redirectTo: 'inicio'
      }
    ] 
  },
  
  {
      path: '**',
      redirectTo: 'register'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
