import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Rutina } from 'src/app/interfaces/rutina';
import { CrudRutinaService } from 'src/app/service/crudRutina.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  public miFormularioActualizar: FormGroup;

  public id_rutina!: number; //indica que si o si llega un valor

  formularioEnviado = false;

  private user!: User; 

  private rutina: Rutina = {
    rutina: '',
    user: this.user
  }

  //injectamos en el constructor 
  constructor(private fb: FormBuilder,private serviceAuth: AuthService, private service: CrudRutinaService, private router: Router, private route: ActivatedRoute) { 
    this.miFormularioActualizar = this.fb.group({
      rutina: [this.rutina.rutina, [Validators.required]],
      user: [this.rutina.user]
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id_rutina = Number(params.get('id')) // Convierte el parámetro a número
      this.service.obtenerRutinaPorID(this.id_rutina).subscribe(resp => {
        if(this.serviceAuth.currentUser){
          this.user = this.serviceAuth.currentUser;
          this.miFormularioActualizar.setValue({
            rutina: resp.rutina,
            user: this.user
            // Otros campos del formulario si los hay
          });
        }
        
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

    this.service.actualizarRutina(this.id_rutina,this.miFormularioActualizar.value).subscribe(response => {

      this.router.navigate(['/auth/listado-rutina']);
    },
    (error) => {
      console.log("Respuesta erronea: " +  error);
    });
  }
}
