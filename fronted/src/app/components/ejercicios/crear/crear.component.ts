import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rutina } from 'src/app/interfaces/rutina';
import { CrudEjercicioService } from 'src/app/service/crudEjercicio.service';
import { CrudRutinaService } from 'src/app/service/crudRutina.service';

@Component({
  selector: 'app-crear-ejercicio',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearEjercicioComponent implements OnInit {
  public miFormulario: FormGroup;

  public id_rutina!: Number;

  formularioEnviado = false;

  private rutina: Rutina = {
    rutina: ''
  }

  //injectamos en el constructor 
  constructor(private fb: FormBuilder, private service: CrudEjercicioService,private serviceRutina: CrudRutinaService, private activatedRoute: ActivatedRoute, private route: Router) { 
    this.miFormulario = this.fb.group({
      rutina: [this.rutina.rutina, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      //Cogemos el id del parametro
      const id = params['id'];
      this.id_rutina = id;
      //comprobamos que existe en la BD
      this.serviceRutina.obtenerRutinaPorID(id).subscribe(resp => {
        //Si hay respuesta
        
      }, (error) => {
        console.log(error);
        //Si da error es que no existe 
        this.route.navigate(['/listado-rutinas']);
      })
    });
  }


  validacion(arg:string){
    return this.miFormulario.controls[`${arg}`].hasError('required') && this.miFormulario.controls[`${arg}`].touched;
  }

  enviar(){
    //archivo.ts
    this.formularioEnviado = true;
    console.log("Enviar");
    if(this.miFormulario.invalid){
      //va campo por campo y toca todo el formulario
      this.miFormulario.markAllAsTouched();
      return;

    }

    //Si es correcto el formulario

    this.service.crearEjercicios(this.miFormulario.value).subscribe(response => {

      this.route.navigate(['listado-rutina']);
    },
    (error) => {
      console.log("Respuesta erronea: " +  error);
    });
  }
}
