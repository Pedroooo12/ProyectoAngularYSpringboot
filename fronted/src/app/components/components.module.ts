import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarComponent } from './rutina/actualizar/actualizar.component';
import { CrearComponent } from './rutina/crear/crear.component';
import { ListadoComponent } from './rutina/listado/listado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';



@NgModule({
  declarations: [
    //declaramos los componentes rutina
    ActualizarComponent,
    CrearComponent,
    ListadoComponent,
    InicioComponent
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
    InicioComponent
  ]
})
export class ComponentsModule { }
