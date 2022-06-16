/** CLASE TICKET QUE ACTUA COMO POJO PARA JSON 
 * DEL CAMPO TICKET DE LA TABLA HISTORIA DE USUARIO SEGÚN
 * LA HISTORIA DE USUARIO
*/
export class Ticket {
    Id_ticket !: number;
    Comentario !:string;
    Estado!:string;
}