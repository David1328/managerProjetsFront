import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-histori-usuario',
  templateUrl: './registro-histori-usuario.component.html',
  styleUrls: ['./registro-histori-usuario.component.css']
})
export class RegistroHistoriUsuarioComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
  }

  public formRH = this.formBuilder.group({
    historia: ['',[Validators.required,  Validators.maxLength(20),  Validators.minLength(3),  Validators.pattern('[a-zA-Z ]*'),]],
    id_proyecto: ['',[Validators.required,  Validators.minLength(4), Validators.maxLength(20),  Validators.pattern('[a-zA-Z ]*'),]],
  });
}
