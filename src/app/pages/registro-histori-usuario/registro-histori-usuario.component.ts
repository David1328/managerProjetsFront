import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
  private nuevaHistoria = new HistoriaDeUsuario();
  private nuevoTicket = new Ticket();

  public HistoriasTabla = new MatTableDataSource<HistoriaDeUsuario>();

  displayedColumns: string[] = ['Historia', 'Proyecto'];

  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    private proyectoService: ProyectoService,
    private historiasDeUsuarioService:HistoriaDeUsuarioService,
    private router:Router) { }

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
    historia: ['',[Validators.required,  Validators.maxLength(200),  Validators.minLength(3),  Validators.pattern('[a-zA-Z ]*'),]],
    id_proyecto: ['',[Validators.required]],
    comentario: ['',[Validators.required,  Validators.minLength(4), Validators.maxLength(200),  Validators.pattern('[a-zA-Z ]*'),]],
  });

  registroHistoria(){
    //para ticket con historia
    this.nuevoTicket.Comentario = this.formRH.value.comentario;
    this.nuevoTicket.Estado="Activo";
    //para historia nueva
    this.nuevaHistoria.proyecto_id = this.formRH.value.id_proyecto;
    this.nuevaHistoria.historia = this.formRH.value.historia;
    this.nuevaHistoria.empresa_id = this.usuario.id_empresa;
    this.nuevaHistoria.nuevosTickets = this.nuevoTicket;
    //servicio
    this.historiasDeUsuarioService.postNuevaHistoria(this.nuevaHistoria).subscribe(respuesta=>{
      this.ngOnInit();
      this.openSnackBar(respuesta);
      this.router.navigate(['administrarTicket']);
    },err=>{
      console.log(err)
      this.openSnackBar(err);
    })
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
