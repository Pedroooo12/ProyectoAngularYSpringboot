import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Rutina } from 'src/app/interfaces/rutina';
import { CrudRutinaService } from 'src/app/service/crudRutina.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  public miFormulario: FormGroup;

  formularioEnviado = false;

  private rutina: Rutina = {
    rutina: ''
  }

  //injectamos en el constructor 
  constructor(private fb: FormBuilder, private service: CrudRutinaService, private route: Router) { 
    this.miFormulario = this.fb.group({
      rutina: [this.rutina.rutina, [Validators.required]],
    })
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

    this.service.crearRutina(this.miFormulario.value).subscribe(response => {

      this.route.navigate(['/auth/listado-rutina']);
    },
    (error) => {
      console.log("Respuesta erronea: " +  error);
    });
  }
}
