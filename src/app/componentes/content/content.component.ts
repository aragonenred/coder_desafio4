import { Component, OnInit, ViewChild } from '@angular/core';
import { AlumnosTablaComponent } from '../alumnos-tabla/alumnos-tabla.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  paises:string[]= ['Argentina','Bolivia', 'Brasil','Chile', 'Paraguay', 'Uruguay' ];
  @ViewChild(AlumnosTablaComponent) tabla?: AlumnosTablaComponent;

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    documento: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    edad: new FormControl('', [Validators.required]),
    pais: new FormControl('',[Validators.required]),
  });


  constructor() { }

  ngOnInit(): void {

  }

  agregarAlumno(){
      console.log("clicka");
      let alumno = {
            nombre: this.formulario.get('nombre')?.value,
            apellido: this.formulario.get('apellido')?.value,
            documento: this.formulario.get('documento')?.value,
            email: this.formulario.get('email')?.value,
            nacimiento: this.formulario.get('edad')?.value,
            pais: this.formulario.get('pais')?.value
          };

      console.log(this.formulario);
      if(this.formulario.status =='VALID'){
        this.tabla?.actualizaTabla(alumno);
      }

  }

}
