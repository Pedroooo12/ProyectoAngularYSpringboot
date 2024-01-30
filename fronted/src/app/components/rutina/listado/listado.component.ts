import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Rutina } from 'src/app/interfaces/rutina';
import { CrudService } from 'src/app/service/crudRutina.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {
  public listadoRutinas: Rutina[] = [];


  constructor(private service: CrudService, private router: Router){

  }

  ngOnInit(): void {
    this.devolverRutinas();
  }

  async devolverRutinas(){
     this.service.buscarRutinas().subscribe(resp => {
      this.listadoRutinas = resp;
    });
  }

  async eliminarRutina(id: any){
    this.service.eliminarRutina(id).subscribe(response => {
      console.log(response );
      this.devolverRutinas();
    },(error) => {
      console.log(error);
    });

  }

  actualizarRutina(id: any){
    this.router.navigate(['/actualizar-rutina/' , id]);
    console.log("click");
  }

  irEjercicios(id: any){
    this.router.navigate(['/ejercicio/' , id]);
  }
}
