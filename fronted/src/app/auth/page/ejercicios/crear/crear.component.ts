import { AuthService } from 'src/app/auth/services/auth.service';
import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
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

  private user!: User;

  public previewImage: boolean = false;

  imagenFile!: String;

  public rutina: Rutina = {
    rutina: '',
    user: this.user
  };

  formularioEnviado = false;

  private ejercicio: Ejercicios = {
    nombre: '',
    series: 0,
    repeticiones: 0,
    imagen: '',
    rutina: this.rutina,
  }

  //injectamos en el constructor 
  constructor(private fb: FormBuilder, private service: CrudEjercicioService, private serviceAuth: AuthService,private serviceRutina: CrudRutinaService, private activatedRoute: ActivatedRoute, private route: Router) { 
    this.miFormulario = this.fb.group({
      nombre: [this.ejercicio.nombre, [Validators.required]],
      series: [this.ejercicio.series, [Validators.required,Validators.min(1)]],
      repeticiones: [this.ejercicio.repeticiones, [Validators.required, Validators.min(1)]],
      imagen: [this.ejercicio.imagen, [Validators.required]],
      rutina: [this.ejercicio.rutina, [Validators.required]],
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
          this.ejercicio.rutina = this.rutina;
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
    if(this.miFormulario.invalid){
      //va campo por campo y toca todo el formulario
      this.miFormulario.markAllAsTouched();
      return;

    }

    //COger datos
    
    this.miFormulario.patchValue({
      imagen: this.imagenFile
    });
   this.service.crearEjercicios(this.miFormulario.value).subscribe(response => {
      this.route.navigate(['/auth/', this.rutina_id, 'listado-ejercicios']);
    },
    (error) => {
      console.log("Respuesta erronea: " +  error);
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.previewImage = true;

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        //const base64String = e.target.result.split(',')[1];
        const base64String = e.target.result;
        this.imagenFile = base64String;
        this.miFormulario.patchValue({ imagen: this.imagenFile });
        // Ahora puedes utilizar base64String como necesites, por ejemplo, enviarlo al servidor.
      };

      reader.readAsDataURL(file);
  }
  
}

  
  
  
}
