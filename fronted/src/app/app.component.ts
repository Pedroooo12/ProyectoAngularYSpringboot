import { Component } from '@angular/core';
import { Menu } from './interfaces/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProyectoAngular16';
  public menu: Menu[] = [
    {
      title: 'Inicio',
      route: 'inicio'
    },
    {
      title: 'Listado Rutina',
      route: 'listado-rutina'
    },
    {
      title: 'Crear Rutina',
      route: 'crear-rutina'
    }
  ]
}
