import { Dias } from "./dias";

export interface MenuDTO {
    idmenu: number;  // El ID del menú
    precio: number;  // El precio total del menú
    tipo: string;    // El nombre o tipo del menú
    comidas: number[];  // Lista de IDs de comidas (números que representan las comidas)
    dias: Dias;    

}
