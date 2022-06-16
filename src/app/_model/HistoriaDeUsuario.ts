/** CLASE HISTORIA DE USUARIO QUE ACTUA COMO POJO PARA  LA TABLA UHISTORIADEUSUARIO DEL BACK-END*/
import { Ticket } from "./Ticket";

export class HistoriaDeUsuario {
    id_historia !: number;
    historia !:string;
    empresa_id!:number;
    proyecto_id!:number;
    proyecto!:string;
    tickes !:string;
    nuevosTickets !:Ticket;
}