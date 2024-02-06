import { User } from './../interfaces/user';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AuthService {

    private ApiURL = "http://localhost:9000/api/auth";
    private user?: User;
    constructor(private http: HttpClient) { }

    registrarse(user: User): Observable<User>{
        return this.http.post<User>(`${this.ApiURL}/register`, user).pipe(
            tap(user => {
                this.user = user; })
           );;
    }

    logearse(user: User): Observable<User>{

       return this.http.post<User>(`${this.ApiURL}/login`, user).pipe(
        tap(user => {
            this.user = user; })
       );
    }

    get currentUser(): User | undefined{
        if(!this.user){
            return undefined;
        }

        //Devuelve una copia profunda del usuario para que no se alterar
        return structuredClone (this.user); 
    }

    get token(): Number | undefined{
        if(localStorage.getItem('token')){
            return Number(localStorage.getItem('token'));
        }

        return;
    }

    devolverUsuarioPorId(id: Number): Observable<User>{
        return this.http.get<User>(`${this.ApiURL}/checkAuth/${id}`);
    }

    //true si esta autenticado y false sino
    checkAuthentication(): Observable<boolean>{
        if(!localStorage.getItem('token')){
            //ponemos of porque es un observable
            return of(false);
        }
        const token = localStorage.getItem('token');
        return this.http.get<User>(`${this.ApiURL}/checkAuth/${token}`)
        .pipe(
            tap(user => this.user = user),
            //doble negación da true porque si tiene un valor, negar una vez es false , la segunda true
            map(user => !!user),
            catchError(err => of(false))
        )
    }
    
}