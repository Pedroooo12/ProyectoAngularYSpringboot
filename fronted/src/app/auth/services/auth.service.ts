import { Observable, catchError, map, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({providedIn: 'root'})
export class AuthService {

    private ApiURL = "http://localhost:9000/api/auth";
    private user?: User;
    constructor(private http: HttpClient) { }

    registrarse(user: User): Observable<User>{
        return this.http.post<User>(this.ApiURL, user);
    }

    logearse(user: User): Observable<User>{

       return this.http.post<User>(`${this.ApiURL}/login`, user).pipe(
        tap(user => {
            this.user = user; 
            console.log(this.user)})
       );
    }

    get currentUser(): User | undefined{
        if(!this.user){
            return undefined;
        }

        //Devuelve una copia profunda del usuario para que no se alterar
        return structuredClone (this.user); 
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