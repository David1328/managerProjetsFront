import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/_service/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {
  usuario!: string;
  password!: string;
  hide = true;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private loginService:LoginService) { }

  ngOnInit(): void {
  }
  
  public formFR = this.formBuilder.group({
    documento: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(6), Validators.pattern('[0-9]*'),]],
    clave: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
  });

  ingresar(){
    let user = this.formFR.value;
    this.loginService.login(user).subscribe(data =>{
      console.log(data)
      sessionStorage.setItem(environment.TOKEN, data);
      this.loginService.paginaReactiva.next(true);
      this.openSnackBar("Ingreso correctamente");
      //this.router.navigate(['inicio']);
    }, err => {
      this.openSnackBar("Usuario o contraseña Incorrecta\nIntente nuevamente");
    });
  
  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Aceptar', {
      duration: 8000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
