import { User } from './../../../auth/interfaces/user';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Menu } from 'src/app/interfaces/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public menu: Menu[] = [
    {
      title: 'Inicio',
      route: 'inicio'
    },
    {
      title: 'Listado Rutina',
      route: 'auth/listado-rutina'
    },
    {
      title: 'Crear Rutina',
      route: 'auth/crear-rutina'
    }
  ];

  constructor(private route: Router, private service: AuthService){
  }

  logOut(){
    localStorage.clear();
    this.route.navigate(['/register']);
  }

  get user(): User | undefined{
    return this.service.currentUser;
  }
}