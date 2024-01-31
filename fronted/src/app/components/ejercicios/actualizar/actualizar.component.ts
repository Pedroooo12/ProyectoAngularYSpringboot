import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rutina } from 'src/app/interfaces/rutina';
import { CrudEjercicioService } from 'src/app/service/crudEjercicio.service';

@Component({
  selector: 'app-actualizar-ejercicio',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarEjercicioComponent implements OnInit {
  public miFormularioActualizar: FormGroup;

  public id_rutina!: number; //indica que si o si llega un valor

  formularioEnviado = false;

  private rutina: Rutina = {
    rutina: ''
  }

  //injectamos en el constructor 
  constructor(private fb: FormBuilder, private service: CrudEjercicioService, private router: Router, private route: ActivatedRoute) { 
    this.miFormularioActualizar = this.fb.group({
      rutina: [this.rutina.rutina, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id_rutina = Number(params.get('id')) // Convierte el parámetro a número
      this.service.obtenerEjerciciosPorID(this.id_rutina).subscribe(resp => {
        console.log(resp);
        this.miFormularioActualizar.setValue({
          //rutina: resp.ejercicio
          // Otros campos del formulario si los hay
        });
        
      }, (error) => {
        console.log(error);
      });
    });


    
  }

  validacion(arg:string){
    return this.miFormularioActualizar.controls[`${arg}`].hasError('required') && this.miFormularioActualizar.controls[`${arg}`].touched;
  }

  enviar(){
    //archivo.ts
    this.formularioEnviado = true;
    if(this.miFormularioActualizar.invalid){
      //va campo por campo y toca todo el formulario
      this.miFormularioActualizar.markAllAsTouched();
      return;

    }

    //Si es correcto el formulario

    this.service.actualizarEjercicios(this.id_rutina,this.miFormularioActualizar.value).subscribe(response => {

      this.router.navigate(['listado-rutina']);
    },
    (error) => {
      console.log("Respuesta erronea: " +  error);
    });
  }
}
