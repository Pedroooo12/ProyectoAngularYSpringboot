import { Injectable } from '@angular/core';
import { Rutina } from '../interfaces/rutina';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private ApiURL = "http://localhost:9000/api/rutina";

  constructor(private http: HttpClient) { 
  }

  buscarRutinas(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(this.ApiURL);
  }


  crearRutina(rutina: Rutina): Observable<Rutina>{
    return this.http.post<Rutina>(this.ApiURL, rutina);
  }

  obtenerRutinaPorID(id: number): Observable<Rutina>{
    return this.http.get<Rutina>(`${this.ApiURL}/${id}`);
  }

  actualizarRutina(id:number, rutina: Rutina): Observable<Rutina>{
    return this.http.put<Rutina>(`${this.ApiURL}/${id}`, rutina);
  }

  eliminarRutina(id:number): Observable<Rutina>{
    return this.http.delete<Rutina>(`${this.ApiURL}/${id}`);
  }
}
