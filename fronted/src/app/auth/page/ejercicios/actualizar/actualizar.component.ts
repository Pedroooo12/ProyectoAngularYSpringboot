import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ejercicios } from 'src/app/interfaces/ejercicios';
import { Rutina } from 'src/app/interfaces/rutina';
import { CrudEjercicioService } from 'src/app/service/crudEjercicio.service';
import { CrudRutinaService } from 'src/app/service/crudRutina.service';

@Component({
  selector: 'app-actualizar-ejercicio',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarEjercicioComponent implements OnInit {
  public miFormularioActualizar: FormGroup;

  public id_rutina!: number; //indica que si o si llega un valor
  public id_ejercicio!: number;

  imagenFile!: String;

  formularioEnviado = false;

  public rutina: Rutina = {
    rutina: ''
  };

  public ejercicio: Ejercicios = {
    nombre: '',
    series: 0,
    repeticiones: 0,
    imagen: '',
    rutina: this.rutina
  }

  //injectamos en el constructor 
  constructor(private fb: FormBuilder, private service: CrudEjercicioService,private serviceRutina: CrudRutinaService, private router: Router, private route: ActivatedRoute) { 
    this.miFormularioActualizar = this.fb.group({
      nombre: [this.ejercicio.nombre, [Validators.required]],
      series: [this.ejercicio.series, [Validators.required,Validators.min(1)]],
      repeticiones: [this.ejercicio.repeticiones, [Validators.required, Validators.min(1)]],
      imagen: [this.ejercicio.imagen, [Validators.required]],
      rutina: [this.ejercicio.rutina, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id_rutina = Number(params.get('id'));
      this.id_ejercicio = Number(params.get('idEjercicio'));
       // Convierte el parámetro a número
      this.serviceRutina.obtenerRutinaPorID(this.id_rutina).subscribe(resp => {
        this.service.obtenerEjerciciosPorID(this.id_ejercicio).subscribe(resp => {

          this.ejercicio.nombre = resp.nombre;
          this.ejercicio.series = resp.series;
          this.ejercicio.repeticiones = resp.repeticiones;
          this.ejercicio.imagen = resp.imagen;
          this.ejercicio.rutina = resp.rutina;
          this.miFormularioActualizar.setValue(this.ejercicio);
        }, (error) => {

        })
        
        
      }, (error) => {
        console.log(error);
      });
    });


    
  }

  validacion(arg:string){
    return this.miFormularioActualizar.controls[`${arg}`].hasError('required') && this.miFormularioActualizar.controls[`${arg}`].touched;
  }

  validacionNumeros(arg:string){
    return this.miFormularioActualizar.controls[`${arg}`].hasError('min') && this.miFormularioActualizar.controls[`${arg}`].touched;
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

    this.service.actualizarEjercicios(this.id_ejercicio,this.miFormularioActualizar.value).subscribe(response => {

      this.router.navigate(['/auth/' + this.id_rutina +'/listado-ejercicios']);
    },
    (error) => {
      console.log("Respuesta erronea: " +  error);
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        //const base64String = e.target.result.split(',')[1];
        const base64String = e.target.result;
        this.imagenFile = base64String;
        console.log(this.imagenFile);
        this.miFormularioActualizar.patchValue({ imagen: this.imagenFile });
        // Ahora puedes utilizar base64String como necesites, por ejemplo, enviarlo al servidor.
      };
    
      reader.readAsDataURL(file);
    }
  }
}
