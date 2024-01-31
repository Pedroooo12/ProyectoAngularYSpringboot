import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Ejercicios } from 'src/app/interfaces/ejercicios';
import { CrudEjercicioService } from 'src/app/service/crudEjercicio.service';
import { CrudRutinaService } from 'src/app/service/crudRutina.service';

@Component({
  selector: 'app-listado-ejercicio',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoEjerciciosComponent {
  public listadoEjercicios: Ejercicios[] = [];

  public id_rutina!: Number;

  constructor(private service: CrudEjercicioService, private serviceRutina: CrudRutinaService, private activatedRoute: ActivatedRoute, private router: Router){
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      //Cogemos el id del parametro
      const id = params['id'];
      this.id_rutina = id;
      //comprobamos que existe en la BD
      this.serviceRutina.obtenerRutinaPorID(id).subscribe(resp => {
        //Si hay respuesta
        this.devolverEjercicios();
      }, (error) => {
        console.log(error);
        //Si da error es que no existe 
        this.router.navigate(['/listado-rutinas']);
      })
    });
  }

  async devolverEjercicios(){
     this.service.buscarEjercicios().subscribe(resp => {
      this.listadoEjercicios = resp;
    });
  }

  async eliminarEjercicio(id: any){
    this.service.eliminarEjercicios(id).subscribe(response => {
      console.log(response );
      this.devolverEjercicios();
    },(error) => {
      console.log(error);
    });

  }

  actualizarEjercicio(id: any){
    this.router.navigate(['/actualizar-Ejercicios/' , id]);
    console.log("click");
  }
}
