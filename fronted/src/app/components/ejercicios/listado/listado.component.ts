import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Ejercicios } from 'src/app/interfaces/ejercicios';
import { Rutina } from 'src/app/interfaces/rutina';
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
  public nombre_rutina!: String;

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
     this.service.buscarEjerciciosPorRutina(this.id_rutina).subscribe(resp => {
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

  public conseguirImagen(imagen: any){
    // Extraer el contenido codificado de la cadena Base64
    imagen.split(';base64,').pop();

    // Decodificar la cadena Base64 usando atob
    const decodedData = atob(imagen);

    // Convertir la cadena decodificada a un arreglo de bytes
    const byteArray = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      byteArray[i] = decodedData.charCodeAt(i);
    }

    // Crear un Blob a partir del arreglo de bytes
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Crear una URL válida para la imagen
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  }
}
