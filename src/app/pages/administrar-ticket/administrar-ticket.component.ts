import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Estado } from 'src/app/_model/Estados';
import { HistoriaDeUsuario } from 'src/app/_model/HistoriaDeUsuario';
import { Ticket } from 'src/app/_model/Ticket';
import { Usuario } from 'src/app/_model/Usuario';
import { HistoriaDeUsuarioService } from 'src/app/_service/historia-de-usuario.service';
import { TicketService } from 'src/app/_service/ticket.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-administrar-ticket',
  templateUrl: './administrar-ticket.component.html',
  styleUrls: ['./administrar-ticket.component.css']
})
export class AdministrarTicketComponent implements OnInit {


  public historias!: HistoriaDeUsuario[];
  public estados !: Estado[];
  private usuario !: Usuario;
  private usuario_id !: number;

  public tickerParaActualizar !:Ticket;
  private ticketNuevo = new HistoriaDeUsuario();
  private id_historia !: number;

  private id_historiaActualizar !:number;
  public TicketTabla = new MatTableDataSource<Ticket>();
  displayedColumns: string[] = ['Ticket', "Estado", "Editar" ,"Cancelar"];

  constructor(private formBuilder: FormBuilder,
    private historiaDeUsuarioService:HistoriaDeUsuarioService,
    private ticketService:TicketService,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,) { }
  
  public formTN = this.formBuilder.group({
    id_historia: ['',[Validators.required]],
    comentario: ['',[Validators.required,  Validators.maxLength(200),  Validators.minLength(3),  Validators.pattern('[a-zA-Z ]*'),]]
  });
  public formET = this.formBuilder.group({
    comentario: ['',[Validators.required,  Validators.maxLength(200),  Validators.minLength(3),  Validators.pattern('[a-zA-Z ]*'),]],
    estado: ['',[Validators.required]]
  });
  
  ngOnInit(): void {
    this.datos();
    this.ticketService.getListaTickets(0).subscribe(tickets=>{
      this.TicketTabla = new MatTableDataSource(tickets);
    })
    this.historiaDeUsuarioService.getListaHistoriaDeUsuario().subscribe(historia=>{
      this.historias = historia.filter(x=>x.empresa_id===this.usuario.id_empresa);
    })
    this.ticketService.getEstados().subscribe(estado=>{
      this.estados = estado;
    })
  }

  registrarNuevoTicket(){
    this.ticketNuevo.id_historia = this.formTN.value.id_historia;
    this.ticketNuevo.nuevosTickets = new Ticket();
    this.ticketNuevo.nuevosTickets.Comentario = this.formTN.value.comentario;
    this.ticketService.postNuevoTicket(this.ticketNuevo).subscribe(respuesta=>{
      this.openSnackBar(respuesta)
      this.ngOnInit();
    });
  }

  cancelarTicket(id_ticket:any,comentario:any){
    //objeto de historia de usuario con su declaracion
    let actualizarTicket = new HistoriaDeUsuario();
    //objeto de ticket con su declaracion
    actualizarTicket.nuevosTickets = new Ticket();
    //informacion para actualizar
    actualizarTicket.id_historia = this.id_historia;
    actualizarTicket.nuevosTickets.Id_ticket = id_ticket;
    actualizarTicket.nuevosTickets.Comentario = comentario;
    actualizarTicket.nuevosTickets.Estado = this.estados[3].estado;

    this.ticketService.putTicket(actualizarTicket).subscribe(respuesta=>{
      this.openSnackBar(respuesta)
      this.ngOnInit();
    })
  }
  editarTicket(id_ticket:any){
    this.id_historiaActualizar = this.id_historia;
    this.ticketService.getTicket(this.id_historiaActualizar,id_ticket).subscribe(ticket=>{
      this.tickerParaActualizar = new Ticket();
      this.tickerParaActualizar = ticket;
      this.formET = this.formBuilder.group({
        comentario: [this.tickerParaActualizar.Comentario,[Validators.required,  Validators.maxLength(200),  Validators.minLength(3),  Validators.pattern('[a-zA-Z ]*'),]],
        estado: [this.tickerParaActualizar.Estado,[Validators.required]]
      });
    })
  }
  actualizarTicket(){
    let actualizarTicket = new HistoriaDeUsuario();
    actualizarTicket.nuevosTickets = new Ticket();
    actualizarTicket.id_historia = this.id_historiaActualizar;
    actualizarTicket.nuevosTickets = this.formET.value;
    actualizarTicket.nuevosTickets.Id_ticket = this.tickerParaActualizar.Id_ticket;
    this.ticketService.putTicket(actualizarTicket).subscribe(respuesta=>{
      this.openSnackBar(respuesta)
      this.ngOnInit();
    })
  }
  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Aceptar', {
      duration: 8000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  applyFilterEli(event:any) {
    this.id_historia = event;
    this.ticketService.getListaTickets(event).subscribe(tickets=>{
      this.TicketTabla = new MatTableDataSource(tickets);
    })
  }
  datos() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN)?.toString());
    this.usuario_id = decodedToken.Usuario;
    this.usuarioService.getInformationUser(this.usuario_id.toString()).subscribe(data => {
      this.usuario = data;
    })
  }
}
