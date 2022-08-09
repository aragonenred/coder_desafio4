import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  hidden:boolean = true;
  menu(){
    if(this.hidden===true){
      this.hidden = false;
    }else{
      this.hidden= true
    }
  }

}
