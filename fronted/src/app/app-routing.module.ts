import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './components/rutina/crear/crear.component';
import { ListadoComponent } from './components/rutina/listado/listado.component';
import { ActualizarComponent } from './components/rutina/actualizar/actualizar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListadoEjerciciosComponent } from './components/ejercicios/listado/listado.component';
import { CrearEjercicioComponent } from './components/ejercicios/crear/crear.component';
import { ActualizarEjercicioComponent } from './components/ejercicios/actualizar/actualizar.component';

const routes: Routes = [
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
      component: CrearComponent
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
