import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CrMercantilFront';

  activo: boolean = false;

  ngOnInit(): void {
    if (localStorage.key(0)== "login") {
      this.activo=true;
    }else{
      this.activo=false;
    }
  }
  
}
