import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { CrudRutinaService } from './service/crudRutina.service';
import { CrudEjercicioService } from './service/crudEjercicio.service';
import { AuthService } from './auth/services/auth.service';
import { AuthModule } from './auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    CrudRutinaService,
    CrudEjercicioService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
