import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HistoriaDeUsuario } from 'src/app/_model/HistoriaDeUsuario';
import { Proyecto } from 'src/app/_model/Proyecto';
import { Ticket } from 'src/app/_model/Ticket';
import { Usuario } from 'src/app/_model/Usuario';
import { HistoriaDeUsuarioService } from 'src/app/_service/historia-de-usuario.service';
import { ProyectoService } from 'src/app/_service/proyecto.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro-histori-usuario',
  templateUrl: './registro-histori-usuario.component.html',
  styleUrls: ['./registro-histori-usuario.component.css']
})
export class RegistroHistoriUsuarioComponent implements OnInit {

  public proyectos!: Proyecto[];
  private usuario_id !: number;
  private usuario !: Usuario;
  private nuevaHistoria !:HistoriaDeUsuario;
  private nuevoTicket !:Ticket;

  public HistoriasTabla = new MatTableDataSource<HistoriaDeUsuario>();

  displayedColumns: string[] = ['Historia', 'Proyecto'];

  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    private proyectoService: ProyectoService,
    private historiasDeUsuarioService:HistoriaDeUsuarioService) { }

  ngOnInit(): void {
    this.datos();
    this.historiasDeUsuarioService.getListaHistoriaDeUsuario().subscribe(historias=>{
      this.HistoriasTabla = new MatTableDataSource(historias.filter(x=>x.empresa_id==this.usuario.id_empresa))
    })
    this.proyectoService.getListaEmpresas().subscribe(proyecto=>{
      this.proyectos = proyecto.filter(x=>x.empresa_id==this.usuario.id_empresa);
    })
  }

  public formRH = this.formBuilder.group({
    historia: ['',[Validators.required,  Validators.maxLength(20),  Validators.minLength(3),  Validators.pattern('[a-zA-Z ]*'),]],
    id_proyecto: ['',[Validators.required,  Validators.minLength(4), Validators.maxLength(20),  Validators.pattern('[a-zA-Z ]*'),]],
    comentario: ['',[Validators.required,  Validators.minLength(4), Validators.maxLength(20),  Validators.pattern('[a-zA-Z ]*'),]],
  });

  registroHistoria(){
    this.nuevaHistoria = this.formRH.value;
    this.nuevoTicket = this.formRH.value;
    this.nuevoTicket.estado="Activo";
    this.nuevaHistoria.nuevosTickets = this.nuevoTicket;
    console.log(this.nuevaHistoria)

  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Aceptar', {
      duration: 8000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
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
