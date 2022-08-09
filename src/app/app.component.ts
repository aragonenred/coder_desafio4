import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PrimerEntrega';
  sizeDisplay?:string;
  @ViewChild(SidebarComponent) sidebar?:SidebarComponent;

  constructor(public breakpointObserver: BreakpointObserver){
    this.mediaQuery();
  }

  public mediaQuery() {
    this.breakpointObserver
    .observe(['(max-width: 768px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.sidebar?.toggleMenu(false);
      }
    });
    this.breakpointObserver
    .observe(['(min-width: 768px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.sidebar?.toggleMenu(true);
      }
    });
  }


}
