import { Injectable } from '@angular/core';
import { Ejercicios } from '../interfaces/ejercicios';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Rutina } from '../interfaces/rutina';

@Injectable({
  providedIn: 'root'
})
export class CrudEjercicioService {

  private ApiURL = "http://localhost:9000/api/ejercicios";

  constructor(private http: HttpClient) { 
  }

  buscarEjercicios(): Observable<Ejercicios[]> {
    return this.http.get<Ejercicios[]>(this.ApiURL);
  }

  buscarEjerciciosPorRutina(id_rutina: Number): Observable<Ejercicios[]>{
    return this.http.get<Ejercicios[]>(`${this.ApiURL}/rutina/${id_rutina}`);
  }


  crearEjercicios(Ejercicios: Ejercicios): Observable<Ejercicios>{
    return this.http.post<Ejercicios>(this.ApiURL, Ejercicios);
  }

  obtenerEjerciciosPorID(id: number): Observable<Ejercicios>{
    return this.http.get<Ejercicios>(`${this.ApiURL}/${id}`);
  }

  actualizarEjercicios(id:number, Ejercicios: Ejercicios): Observable<Ejercicios>{
    return this.http.put<Ejercicios>(`${this.ApiURL}/${id}`, Ejercicios);
  }

  eliminarEjercicios(id:number): Observable<Ejercicios>{
    return this.http.delete<Ejercicios>(`${this.ApiURL}/${id}`);
  }
}
