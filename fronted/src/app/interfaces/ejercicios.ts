import { Rutina } from "./rutina";

export interface Ejercicios {
    id?: number, //indica que es opcional
    nombre: String,
    series: Number,
    repeticiones:  Number,
    imagen: string,
    rutina: Rutina
}
