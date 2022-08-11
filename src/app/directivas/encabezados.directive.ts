import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEncabezados]'
})
export class EncabezadosDirective {

  constructor(private elemento: ElementRef) {

    this.elemento.nativeElement.style.fontSize = '15px';
  }

}
