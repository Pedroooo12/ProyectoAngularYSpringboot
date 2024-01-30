import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './components/rutina/crear/crear.component';
import { ListadoComponent } from './components/rutina/listado/listado.component';
import { ActualizarComponent } from './components/rutina/actualizar/actualizar.component';
import { InicioComponent } from './components/inicio/inicio.component';

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
  },{
      path: '**',
      redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
