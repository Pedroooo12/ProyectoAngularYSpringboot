import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';

import { HeaderComponent } from './page/header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageComponent } from './page/page.component';
import { ActualizarComponent } from './page/rutina/actualizar/actualizar.component';
import { CrearComponent } from './page/rutina/crear/crear.component';
import { ListadoComponent } from './page/rutina/listado/listado.component';
import { ListadoEjerciciosComponent } from './page/ejercicios/listado/listado.component';
import { CrearEjercicioComponent } from './page/ejercicios/crear/crear.component';
import { ActualizarEjercicioComponent } from './page/ejercicios/actualizar/actualizar.component';



@NgModule({
  declarations: [
    //declaramos los componentes rutina
    ActualizarComponent,
    CrearComponent,
    ListadoComponent,
    InicioComponent,
    LoginComponent,
    RegisterComponent,
    PageComponent,
    //declaramos componentes ejercicio
    ListadoEjerciciosComponent,
    CrearEjercicioComponent,
    ActualizarEjercicioComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    PageComponent
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
    ActualizarEjercicioComponent,
    LoginComponent,
    RegisterComponent,
    PageComponent,
  ]
})
export class ComponentsModule { }
