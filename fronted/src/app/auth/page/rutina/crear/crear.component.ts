import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { Rutina } from 'src/app/interfaces/rutina';
import { CrudRutinaService } from 'src/app/service/crudRutina.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  public miFormulario: FormGroup;

  public alerta;

  formularioEnviado = false;

  private user: User = {
    name: '',
    email: '',
    password: ''
  }

  private rutina: Rutina = {
    rutina: '',
    user: this.user
  }

  //injectamos en el constructor 
  constructor(
    private fb: FormBuilder, private service: CrudRutinaService, 
    private serviceAuth: AuthService, 
    private route: Router,
    private servicioNotificaciones: NotificationsService ) { 
    this.miFormulario = this.fb.group({
      rutina: [this.rutina.rutina, [Validators.required]],
      user: [this.rutina.user]
    });

    this.alerta = {
      title: 'Rutina Creada',
      text: 'La rutina ha sido creada correctamente',
      type: 'success',
      duration: 3000
    };
  }

  ngOnInit(): void {
    if(this.serviceAuth.currentUser){
      this.user = this.serviceAuth.currentUser;
      this.miFormulario.patchValue({
        user: this.user
      });

      console.log(this.miFormulario.value);
    }
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
      console.log(this.miFormulario.value);
      this.route.navigate(['/auth/listado-rutina']);
      this.servicioNotificaciones.success('Rutina Creada', "La rutina ha sido creada correctamente",{
        timeOut: 3000,
      })
      
    },
    (error) => {
      console.log("Respuesta erronea: " +  error);
    });
  }
}
