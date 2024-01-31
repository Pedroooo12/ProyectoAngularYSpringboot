import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { CrudRutinaService } from './service/crudRutina.service';
import { CrudEjercicioService } from './service/crudEjercicio.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule
  ],
  providers: [
    CrudRutinaService,
    CrudEjercicioService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
