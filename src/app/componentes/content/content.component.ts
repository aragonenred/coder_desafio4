import { Component, OnInit, ViewChild } from '@angular/core';
import { AlumnosTablaComponent } from '../alumnos-tabla/alumnos-tabla.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alumnos } from '../../interfaces/alumnos';


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
    nacimiento: new FormControl('', [Validators.required]),
    pais: new FormControl('',[Validators.required]),
  });

  alumno!:Alumnos;

  constructor() { }
  ngOnInit(): void {
  }

  agregarAlumno(){
    this.alumno = {
            nombre: this.formulario.get('nombre')?.value,
            apellido: this.formulario.get('apellido')?.value,
            documento: this.formulario.get('documento')?.value,
            email: this.formulario.get('email')?.value,
            nacimiento: this.formulario.get('nacimiento')?.value,
            pais: this.formulario.get('pais')?.value
          };
    if(this.formulario.status =='VALID'){
      this.tabla?.actualizaTabla(this.alumno);
      this.formulario.reset();
    }else{
      alert('Opps! hay datos que te faltan completar 😕')
    }
  }

}
