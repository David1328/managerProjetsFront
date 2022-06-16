import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Proyecto } from 'src/app/_model/Proyecto';
import { Usuario } from 'src/app/_model/Usuario';
import { ProyectoService } from 'src/app/_service/proyecto.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro-proyecto',
  templateUrl: './registro-proyecto.component.html',
  styleUrls: ['./registro-proyecto.component.css']
})
export class RegistroProyectoComponent implements OnInit {

  private usuario_id !: number;
  private usuario !: Usuario;
  private nuevoProyecto !: Proyecto;

  //para la tabla de proyectos
  proyectosTabla = new MatTableDataSource<Proyecto>();
  displayedColumns: string[] = ['Nombre', 'Nombre_creador'];

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService,
    private proyectoService: ProyectoService,
    private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.datos();
    this.proyectoService.getListaEmpresas().subscribe(proyectos => {
      this.proyectosTabla = new MatTableDataSource(proyectos.filter(x => x.empresa_id==this.usuario.id_empresa));
    })
  }

  public formRP = this.formBuilder.group({
    nombre_proyecto: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(6)]],
  });

  registrarProyecto() {
    this.nuevoProyecto = this.formRP.value;
    this.nuevoProyecto.empresa_id = this.usuario.id_empresa;
    this.nuevoProyecto.usuario_id = this.usuario.documento.toString();
    this.proyectoService.postNuevoProyecto(this.nuevoProyecto).subscribe(respuesta => {
      this.openSnackBar(respuesta)
      this.ngOnInit();
    }, err => {
      this.openSnackBar("Ya existe este proyecto");
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
