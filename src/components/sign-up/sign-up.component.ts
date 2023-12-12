import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  showLoginLink: boolean =false;
  message: any = '';
  constructor(private http:HttpClient,private router:Router){

  }
  signUpForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    phone: new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  });
  
onSignin(){
  this.http.post("http://localhost:8080/user/signup",this.signUpForm.value).subscribe((data:any)=>{
    console.log(data);
    if(data.message === "User signed up successfully"){
      this.showLoginLink = true;
    }
  },(error)=>{
    console.log("Error",error);
    this.message = error.error.message;
  })
};
onLogin(){
  this.router.navigate(['/login']);
}
onInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  input.value = this.filterNumeric(input.value);
}

private filterNumeric(value: string): string {
  return value.replace(/[^0-9]/g, ''); // Allow only numeric values
}

}
