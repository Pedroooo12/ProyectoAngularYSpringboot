import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public miFormulario: FormGroup;

  formularioEnviado = false;

  private user: User = {
    name: '',
    email: '',
    password: ''
  }

  //injectamos en el constructor 
  constructor(private fb: FormBuilder, private route: Router) { 
    this.miFormulario = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      password: [this.user.password, [Validators.required]],
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

    console.log(this.miFormulario.value);
  }
}
