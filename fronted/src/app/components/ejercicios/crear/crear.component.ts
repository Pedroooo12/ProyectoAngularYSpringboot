import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ejercicios } from 'src/app/interfaces/ejercicios';
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

  public rutina_id!: number;

  public rutina: Rutina = {
    rutina: ''
  };

  formularioEnviado = false;

  private ejercicio: Ejercicios = {
    nombre: '',
    series: 0,
    repeticiones: 0,
    imagen: '',
    rutina_id: this.rutina
  }

  //injectamos en el constructor 
  constructor(private fb: FormBuilder, private service: CrudEjercicioService,private serviceRutina: CrudRutinaService, private activatedRoute: ActivatedRoute, private route: Router) { 
    this.miFormulario = this.fb.group({
      nombre: [this.ejercicio.nombre, [Validators.required]],
      series: [this.ejercicio.series, [Validators.required,Validators.min(1)]],
      repeticiones: [this.ejercicio.repeticiones, [Validators.required, Validators.min(1)]],
      imagen: [this.ejercicio.imagen, [Validators.required]],
      rutina_id: [this.ejercicio.rutina_id, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      //Cogemos el id del parametro
      const id = params['id'];
      this.rutina_id = id;

      //cojo la rutina
      this.serviceRutina.obtenerRutinaPorID(this.rutina_id).subscribe(resp => {
        this.rutina = resp;
        this.ejercicio.rutina_id = this.rutina;
        this.miFormulario.setValue(this.ejercicio);
      }, (error) => {
        console.log(error);
        //Si da error es que no existe 
        this.route.navigate(['/listado-ejercicios']);
      })

    });
  }


  validacion(arg:string){
    return this.miFormulario.controls[`${arg}`].hasError('required') && this.miFormulario.controls[`${arg}`].touched;
  }

  validacionNumeros(arg:string){
    return this.miFormulario.controls[`${arg}`].hasError('min') && this.miFormulario.controls[`${arg}`].touched;
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

    this.service.crearEjercicios(this.miFormulario.value).subscribe(response => {
      console.log(this.miFormulario.value);
      this.route.navigate(['/', this.rutina_id, 'listado-ejercicios']);
    },
    (error) => {
      console.log("Respuesta erronea: " +  error);
    });
  }
}
