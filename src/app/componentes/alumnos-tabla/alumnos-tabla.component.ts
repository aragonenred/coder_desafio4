import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EditComponent } from '../edit/edit.component';
import { Alumnos } from '../../interfaces/alumnos';
import { AlumnosService } from '../../services/alumnos.service';
import { filter, map, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-alumnos-tabla',
  templateUrl: './alumnos-tabla.component.html',
  styleUrls: ['./alumnos-tabla.component.css']
})
export class AlumnosTablaComponent implements OnInit {


  @Input() parentMensaje?: any;

  columnas:string[] = ['nombre', 'documento', 'email', 'nacimiento', 'pais', 'acciones'];
  alumnos: Alumnos[]=[];

  alumnosSuscription:Subscription;


  dataSource!: MatTableDataSource<Alumnos> ;
  @ViewChild(MatTable) tabla!: MatTable<Alumnos>;

  constructor(private dialog: MatDialog, private alumnosService:AlumnosService) {


    this.alumnosSuscription = this.alumnosService.getAlumnosObservable()
      .pipe(
        map((alumnos: any[]) => alumnos.filter(alumno => alumno.habilitado === true))
      ).subscribe((alumnos)=>{
        console.log("Hubo cambios en mi observable");
        this.alumnos = alumnos;
        console.log(this.alumnos);

      });
   }

  ngOnInit(): void {

    this.dataSource =  new MatTableDataSource<Alumnos>(this.alumnos);


  }

  render(){
    this.tabla.renderRows();
    console.log("renderr");
  }

  actualizaTabla(alumno:Alumnos){
    this.alumnosService.addAlumno(alumno);
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
