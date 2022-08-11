import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EditComponent } from '../edit/edit.component';
import { Alumnos } from '../../interfaces/alumnos';


@Component({
  selector: 'app-alumnos-tabla',
  templateUrl: './alumnos-tabla.component.html',
  styleUrls: ['./alumnos-tabla.component.css']
})
export class AlumnosTablaComponent implements OnInit {


  @Input() parentMensaje?: any;

  columnas:string[] = ['nombre', 'documento', 'email', 'nacimiento', 'pais', 'acciones'];
  alumnos: Alumnos[]=[
    {nombre: "Maria Ana", apellido: "Fernandez", documento: "18653421", email: "ana.maria@gmail.com", nacimiento: "1988-01-23", pais: "Argentina"},
    {nombre: "Juan Alberto", apellido: "Paez", documento: "23615987", email: "juan@gmail.com", nacimiento: "2001-09-10", pais: "Uruguay"},
    {nombre: "Mauro Fernando", apellido: "Alvarez", documento: "24895678", email: "mauro@gmail.com.ar", nacimiento: "1995-09-11", pais: "Chile"},
    {nombre: "Maria Ana", apellido: "Fernandez", documento: "18603421", email: "ana.maria@gmail.com", nacimiento: "2003-01-09", pais: "Argentina"},
    {nombre: "Juan Alberto", apellido: "Paez", documento: "23615187", email: "juan@gmail.com", nacimiento: "1981-09-29", pais: "Bolivia"},
    {nombre: "Mauro Fernando", apellido: "Alvarez", documento: "44895778", email: "mauro@gmail.com.ar", nacimiento: "1997-02-16", pais: "Paraguay"},
    {nombre: "Maria Ana", apellido: "Fernandez", documento: "18613411", email: "ana.maria@gmail.com", nacimiento: "1998-09-01", pais: "Brasil"},
    {nombre: "Juan Alberto", apellido: "Paez", documento: "23615480", email: "juan@gmail.com", nacimiento: "1998-09-01", pais: "Uruguay"},
    {nombre: "Mauro Fernando", apellido: "Alvarez", documento: "44495678", email: "mauro@gmail.com.ar", nacimiento: "1998-09-01", pais: "Paraguay"}
    ];


  dataSource: MatTableDataSource<Alumnos> = new MatTableDataSource<Alumnos>(this.alumnos);
  @ViewChild(MatTable) tabla!: MatTable<Alumnos>;

  constructor(private dialog: MatDialog) {

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

  eliminar(elemento: Alumnos){
    this.alumnos.forEach((alumno, index) => {
        if(alumno.documento === elemento.documento){
          this.alumnos.splice(index, 1);
          this.tabla.renderRows();
        }
    });

  }

  editar(elemento: Alumnos){
    const dialogEdit = this.dialog.open(EditComponent,{width:'500px', data: elemento});

    dialogEdit.afterClosed().subscribe(resultado => {
      if(resultado){
        const item = this.dataSource.data.find(alumno => alumno.documento === resultado.documento);
        const index = this.dataSource.data.indexOf(item!);
        this.dataSource.data[index] = resultado;
        this.tabla.renderRows();
      }
    })

  }

}
