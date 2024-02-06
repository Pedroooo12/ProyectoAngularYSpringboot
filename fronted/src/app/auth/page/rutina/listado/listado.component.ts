import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Rutina } from 'src/app/interfaces/rutina';
import { CrudRutinaService} from 'src/app/service/crudRutina.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {
  public listadoRutinas: Rutina[] = [];


  constructor(private service: CrudRutinaService, private serviceAuth: AuthService, private router: Router){
    if(localStorage.getItem('token')){
      const token = localStorage.getItem('token');
    }
  }

  ngOnInit(): void {
    this.devolverRutinas();
  }

  async devolverRutinas(){
    if(this.serviceAuth.token){
      this.service.buscarRutinas(this.serviceAuth.token).subscribe(resp => {
        this.listadoRutinas = resp;
      });
    }
  }

  async eliminarRutina(id: any){
    this.service.eliminarRutina(id).subscribe(response => {
      this.devolverRutinas();
    },(error) => {
      console.log(error);
    });

  }
}
