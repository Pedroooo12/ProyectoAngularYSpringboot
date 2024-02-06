import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';
import { ListadoComponent } from './page/rutina/listado/listado.component';
import { CrearComponent } from './page/rutina/crear/crear.component';
import { ActualizarComponent } from './page/rutina/actualizar/actualizar.component';
import { ListadoEjerciciosComponent } from './page/ejercicios/listado/listado.component';
import { CrearEjercicioComponent } from './page/ejercicios/crear/crear.component';
import { ActualizarEjercicioComponent } from './page/ejercicios/actualizar/actualizar.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
