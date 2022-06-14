import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-proyecto',
  templateUrl: './registro-proyecto.component.html',
  styleUrls: ['./registro-proyecto.component.css']
})
export class RegistroProyectoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
  }

  public formRP = this.formBuilder.group({
    nombre_proyecto: ['',[Validators.required,  Validators.maxLength(20),  Validators.minLength(3),  Validators.pattern('[a-zA-Z ]*'),]],
  });
}
