import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router:Router){

  }
  onClick(val:string){
    if(val=='login'){
      this.router.navigate(['/login']);
    }
    else{
      this.router.navigate(['/signup']);
    }

  }
}
