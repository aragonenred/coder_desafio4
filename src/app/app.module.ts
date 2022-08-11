import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { ContentComponent } from './componentes/content/content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input';
import{MatSelectModule} from '@angular/material/select';
import { AlumnosTablaComponent } from './componentes/alumnos-tabla/alumnos-tabla.component';
import{MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EdadPipe } from './pipes/edad.pipe';
import { NombreApellidoPipe } from './pipes/nombre-apellido.pipe';
import { PaisPipe } from './pipes/pais.pipe';
import { EditComponent } from './componentes/edit/edit.component';
import { MatDialogModule } from "@angular/material/dialog";
import { EncabezadosDirective } from './directivas/encabezados.directive';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    AlumnosTablaComponent,
    EdadPipe,
    NombreApellidoPipe,
    PaisPipe,
    EditComponent,
    EncabezadosDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
