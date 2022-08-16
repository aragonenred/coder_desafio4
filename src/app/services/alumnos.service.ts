import { Injectable } from '@angular/core';
import { Alumnos } from '../interfaces/alumnos';
import { observable, Observable, Observer, Subject, Subscriber } from 'rxjs';
import { SubscribableOrPromise } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  alumnosObservable:Observable<any>;

  alumnos: Alumnos[]=[
    {nombre: "Maria Ana", apellido: "Fernandez", documento: "18653421", email: "ana.maria@gmail.com", nacimiento: "1988-01-23", pais: "Argentina", habilitado: true},
    {nombre: "Juan Alberto", apellido: "Paez", documento: "23615987", email: "juan@gmail.com", nacimiento: "2001-09-10", pais: "Uruguay", habilitado: true},
    {nombre: "Mauro Fernando", apellido: "Alvarez", documento: "24895678", email: "mauro@gmail.com.ar", nacimiento: "1995-09-11", pais: "Chile", habilitado: true},
    {nombre: "Maria Ana", apellido: "Fernandez", documento: "18603421", email: "ana.maria@gmail.com", nacimiento: "2003-01-09", pais: "Argentina", habilitado: true},
    {nombre: "Juan Alberto", apellido: "Paez", documento: "23615187", email: "juan@gmail.com", nacimiento: "1981-09-29", pais: "Bolivia", habilitado: true},
    {nombre: "Juan Alberto", apellido: "Fernandez", documento: "44895778", email: "mauro@gmail.com.ar", nacimiento: "1997-02-16", pais: "Paraguay", habilitado: false},
    {nombre: "Maria Ana", apellido: "Fernandez", documento: "18613411", email: "ana.maria@gmail.com", nacimiento: "1998-09-01", pais: "Brasil", habilitado: true},
    {nombre: "Juan Alberto", apellido: "Paez", documento: "23615480", email: "juan@gmail.com", nacimiento: "1998-09-01", pais: "Uruguay", habilitado: true},
    {nombre: "Mauro Fernando", apellido: "Alvarez", documento: "44495678", email: "mauro@gmail.com.ar", nacimiento: "1998-09-01", pais: "Paraguay", habilitado: true}
    ];

  paises:string[]= ['Argentina','Bolivia', 'Brasil','Chile', 'Honduras' , 'Paraguay', 'Uruguay'];

  alumnosSubject:Subject<any>;

  constructor() {
    this.alumnosObservable = new Observable<any>((suscriptor)=>{
      suscriptor.next(this.alumnos);

      this.alumnosSubject.subscribe((alumnos)=>{
        console.log("next del alumnos oservable");
        console.log(alumnos);
        suscriptor.next(alumnos);

      });


    });

    this.alumnosSubject = new Subject();

  }

  getPaisesPromise(){
    let promise =  new Promise((resolve, reject)=>{
      if(this.paises.length >0){
        resolve(this.paises);
      }else{
        reject({
          codigo:404,
          error: 'No se pudieron cargar los paises'
        });
      }

    });
    return promise;
  }

  getAlumnosObservable(){
    return this.alumnosObservable;
  }

  addAlumno(alumno:Alumnos){
    this.alumnos.push(alumno);
    this.alumnosSubject.next(this.alumnos);
  }

}
