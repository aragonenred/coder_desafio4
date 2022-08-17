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

    //Me suscribo al observable para obtener la lista de alumnos
    this.alumnosSuscription = this.alumnosService.getAlumnosObservable()
      .pipe(
        //Filtro los alumnos no habilitados
        map((alumnos: any[]) => alumnos.filter(alumno => alumno.habilitado === true))
      ).subscribe((alumnos)=>{
        //Le paso los valores devueltos por el observable al arreglo this.alumnos
        this.alumnos = alumnos;
        //Si dataSource se inicializó (pasó por lo menos una vez por el ngOnInit) llamo a la funcion que renderiza la tabla para que actualice los datos
        if(this.dataSource){
          this.renderTable();
        }
      });
   }

  ngOnInit(): void {
    this.dataSource =  new MatTableDataSource<Alumnos>(this.alumnos);
  }


  //Llamo al servicio addAlumno
  agregarAlumno(alumno:Alumnos){
    this.alumnosService.addAlumno(alumno);
  }

  eliminarAlumno(elemento: Alumnos){
    this.alumnosService.deleteAlumno(elemento);
  }


  editarAlumno(elemento: Alumnos){
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

  //Funcion que renderiza la tabla de alumnos
  renderTable(){
    this.dataSource = new MatTableDataSource<Alumnos>(this.alumnos);
    this.tabla.renderRows();
  }
   //Filtro de la tabla

  filtrar(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }


}
