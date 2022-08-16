import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  timeLoginObservable: Observable<any>;


  constructor() {
    this.timeLoginObservable = new Observable<any>((suscriptor) => {
      let seconds:number = 0;
      let minutes:number = 0;
      let hours:number = 0;
     setInterval(()=>{
        let time:string = this.fill(hours) + ':' + this.fill(minutes) + ':' + this.fill(seconds);
        suscriptor.next(time);
        seconds++;
        if(seconds>59){
          minutes++;
          seconds = 0;
        }
        if(minutes>59){
          hours++;
          minutes =0;
        }

     },1000)

      });

  }

  fill(number:number){
      return "0".repeat(2 - number.toString().length) + number.toString();
  }



}


/*
()=>{
        let seconds:number = 50;
        let minutes:number = 59;
        let hours:number = 0;
        let time:string = hours + ':' + minutes + ':' + seconds;
        setInterval(()=>{
            seconds++;
            if(seconds>59){
              minutes++;
              seconds = 0;
            }
            if(minutes>59){
              hours++;
              minutes =0;
            }
        }, 1000);
        return time;
      });
      */
