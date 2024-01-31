import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarComponent } from './rutina/actualizar/actualizar.component';
import { CrearComponent } from './rutina/crear/crear.component';
import { ListadoComponent } from './rutina/listado/listado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ListadoEjerciciosComponent } from './ejercicios/listado/listado.component';
import { CrearEjercicioComponent } from './ejercicios/crear/crear.component';
import { ActualizarEjercicioComponent } from './ejercicios/actualizar/actualizar.component';



@NgModule({
  declarations: [
    //declaramos los componentes rutina
    ActualizarComponent,
    CrearComponent,
    ListadoComponent,
    InicioComponent,
    //declaramos componentes ejercicio
    ListadoEjerciciosComponent,
    CrearEjercicioComponent,
    ActualizarEjercicioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    //exportamos los componentes rutina
    ActualizarComponent,
    CrearComponent,
    ListadoComponent,
    InicioComponent,
    ListadoEjerciciosComponent,
    CrearEjercicioComponent,
    ActualizarEjercicioComponent
  ]
})
export class ComponentsModule { }
