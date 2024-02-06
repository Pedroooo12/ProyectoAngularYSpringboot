import { User } from "../auth/interfaces/user";

export interface Rutina {
    id?: number, //indica que es opcional
    rutina: String,
    user: User
}
