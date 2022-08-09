import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import{Alumnos} from '../../interfaces/alumnos'

@Component({
  selector: 'app-alumnos-tabla',
  templateUrl: './alumnos-tabla.component.html',
  styleUrls: ['./alumnos-tabla.component.css']
})
export class AlumnosTablaComponent implements OnInit {


  @Input() parentMensaje?: any;

  columnas:string[] = ['nombre', 'documento', 'email', 'nacimiento', 'pais'];
  alumnos: Alumnos[]=[
    {nombre: "Maria Ana", apellido: "Fernandez", documento: "18613421", email: "ana.maria@gmail.com", nacimiento: "1988-01-23", pais: "Argentina"},
    {nombre: "Juan Alberto", apellido: "Paez", documento: "23615487", email: "juan@gmail.com", nacimiento: "2001-09-10", pais: "Uruguay"},
    {nombre: "Mauro Fernando", apellido: "Alvarez", documento: "44895678", email: "mauro@gmail.com.ar", nacimiento: "1995-09-11", pais: "Chile"},
    {nombre: "Maria Ana", apellido: "Fernandez", documento: "18613421", email: "ana.maria@gmail.com", nacimiento: "2003-01-09", pais: "Argentina"},
    {nombre: "Juan Alberto", apellido: "Paez", documento: "23615487", email: "juan@gmail.com", nacimiento: "1981-09-29", pais: "Bolivia"},
    {nombre: "Mauro Fernando", apellido: "Alvarez", documento: "44895678", email: "mauro@gmail.com.ar", nacimiento: "1997-02-16", pais: "Paraguay"},
    {nombre: "Maria Ana", apellido: "Fernandez", documento: "18613421", email: "ana.maria@gmail.com", nacimiento: "1998-09-01", pais: "Brasil"},
    {nombre: "Juan Alberto", apellido: "Paez", documento: "23615487", email: "juan@gmail.com", nacimiento: "1998-09-01", pais: "Uruguay"},
    {nombre: "Mauro Fernando", apellido: "Alvarez", documento: "44895678", email: "mauro@gmail.com.ar", nacimiento: "1998-09-01", pais: "Paraguay"}
    ];

  dataSource: MatTableDataSource<Alumnos> = new MatTableDataSource<Alumnos>(this.alumnos);
  @ViewChild(MatTable) tabla!: MatTable<Alumnos>;

  constructor() {

   }

  ngOnInit(): void {

  }

  actualizaTabla(alumno:Alumnos){
    this.alumnos.push(alumno);
    this.tabla.renderRows();
  }

  filtrar(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }

}
