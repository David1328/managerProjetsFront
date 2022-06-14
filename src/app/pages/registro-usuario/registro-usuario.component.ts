import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/_model/Empresa';
import { Usuario } from 'src/app/_model/Usuario';
import { EmpresasService } from 'src/app/_service/empresas.service';
import { UsuarioService } from 'src/app/_service/usuario.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {


  public hide: boolean = true;

  public empresas !: Empresa[];
  private nuevoUsuario = new Usuario();


  constructor(private formBuilder: FormBuilder, private empresasServise: EmpresasService,
    private usuarioService: UsuarioService, private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.empresasServise.getListaEmpresas().subscribe(data => {
      this.empresas = data;
    })
  }
  public formRU = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'),]],
    apellido: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'),]],
    documento: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(6), Validators.pattern('[0-9]*'),]],
    clave: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
    id_empresa: ['', [Validators.required]],
  });
  registrar() {
    this.nuevoUsuario = this.formRU.value;
    this.usuarioService.postAgregarUsuarioNuevo(this.nuevoUsuario).subscribe(data => {
      this.openSnackBar(data);
      this.router.navigate(['']);
    }, err => {
      if(err.statusText === "Conflict"){
        this.openSnackBar("Ya existe ese usuario")
      }else{
        this.openSnackBar(err.statusText);
      }
    })
  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Aceptar', {
      duration: 8000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
