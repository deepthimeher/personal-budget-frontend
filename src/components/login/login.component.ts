import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: any = '';
  showLoginLink!: boolean;
  constructor(private http:HttpClient,private router:Router,private service:AuthenticationService){

  }
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required)
  });
  
onLogin(){
  this.http.post("http://localhost:8080/user/login",this.loginForm.value).subscribe((data:any)=>{
    console.log(data);
    if(data.message === "User logged in successfully"){
      sessionStorage.setItem('token',data.token);
      sessionStorage.setItem('userId',data.userId);
      sessionStorage.setItem('userName',data.username);
      this.service.setToken(data.token);
      this.router.navigate(['/dashboard']);
      
    }
  },(error)=>{
    console.log("Error",error);
    this.message = error.error.message;
  })
};
onSignin(){
  this.router.navigate(['/signup']);
}
}
