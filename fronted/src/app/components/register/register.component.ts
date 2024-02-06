import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { UserRegister } from 'src/app/auth/interfaces/userRegister';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public miFormulario: FormGroup;

  formularioEnviado = false;

  private user: UserRegister = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  //injectamos en el constructor 
  constructor(private fb: FormBuilder, private route: Router, private service: AuthService) { 
    this.miFormulario = this.fb.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
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
    this.service.registrarse(this.miFormulario.value).subscribe(user => {
      localStorage.setItem('token', user.id!.toString());
      this.route.navigate(['auth/inicio']);
    }, (error) => {
      console.log(error);
    })

    console.log(this.miFormulario.value);
  }
}
