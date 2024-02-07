import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { CrearComponent } from './page/rutina/crear/crear.component';
import { CrearEjercicioComponent } from './page/ejercicios/crear/crear.component';
import { ActualizarComponent } from './page/rutina/actualizar/actualizar.component';
import { ActualizarEjercicioComponent } from './page/ejercicios/actualizar/actualizar.component';
import { HeaderComponent } from './page/header/header.component';
import { ListadoComponent } from './page/rutina/listado/listado.component';
import { ListadoEjerciciosComponent } from './page/ejercicios/listado/listado.component';
import { InicioComponent } from './page/inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from './page/page.component';
import { SimpleNotificationsModule } from 'angular2-notifications';


@NgModule({
  declarations: [
    HeaderComponent,
    CrearComponent,
    CrearEjercicioComponent,
    ActualizarComponent,
    ActualizarEjercicioComponent,
    ListadoComponent,
    ListadoEjerciciosComponent,
    InicioComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SimpleNotificationsModule
  ],
  exports: [
    HeaderComponent,
    CrearComponent,
    CrearEjercicioComponent,
    ActualizarComponent,
    ActualizarEjercicioComponent,
    HeaderComponent,
    ListadoComponent,
    ListadoEjerciciosComponent,
    InicioComponent,
    PageComponent
  ]
})
export class AuthModule { }
