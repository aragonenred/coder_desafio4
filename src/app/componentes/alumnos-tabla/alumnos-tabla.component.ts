import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

export interface Alumnos {
  nombre:string;
  apellido:string;
  documento: string;
  email: string;
  nacimiento:string;
  pais: string;
}



@Component({
  selector: 'app-alumnos-tabla',
  templateUrl: './alumnos-tabla.component.html',
  styleUrls: ['./alumnos-tabla.component.css']
})
export class AlumnosTablaComponent implements OnInit {


  @Input() parentMensaje?: any;

  columnas:string[] = ['nombre', 'documento', 'email', 'edad', 'pais'];
  alumnos: Alumnos[]=[
    {nombre: "Maria Ana", apellido: "Fernandez", documento: "18613421", email: "ana.maria@gmail.com", nacimiento: "23", pais: "Argentina"},
    {nombre: "Juan Alberto", apellido: "Paez", documento: "23615487", email: "juan@gmail.com", nacimiento: "29", pais: "Uruguay"},
    {nombre: "Mauro Fernando", apellido: "Alvarez", documento: "44895678", email: "mauro@gmail.com.ar", nacimiento: "18", pais: "Paraguay"}
    ];


  dataSource: MatTableDataSource<Alumnos> = new MatTableDataSource<Alumnos>(this.alumnos);
  @ViewChild(MatTable) tabla!: MatTable<Alumnos>;

  constructor() {

   }

  ngOnInit(): void {

  }

  actualizaTabla(alumno:Alumnos){
    console.log(alumno);
    this.alumnos.push(alumno);
    this.tabla.renderRows();

  }

}
