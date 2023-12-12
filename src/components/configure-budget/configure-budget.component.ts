import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configure-budget',
  templateUrl: './configure-budget.component.html',
  styleUrls: ['./configure-budget.component.css']
})
export class ConfigureBudgetComponent {
  successmessage: any = '';
  errormessage: string ='';
  constructor(private http:HttpClient,private router:Router){

  }
  displayedColumns: string[] = ['category', 'value','actions'];
  monthdatadropdown:any=[
    {value:'jan', desc:'January'},
    {value:'feb', desc:'February'},
    {value:'mar', desc:'March'},
    {value:'apr', desc:'April'},
    {value:'may', desc:'May'},
    {value:'jun', desc:'June'},
    {value:'july', desc:'July'},
    {value:'aug', desc:'August'},
    {value:'sep', desc:'September'},
    {value:'oct', desc:'October'},
    {value:'nov', desc:'November'},
    {value:'dec', desc:'December'},
  ];
  year:string='';
  month:any=''
  ELEMENT_DATA: any = [
    {category: 'Food', amount: 0},
    {category: 'Travel', amount: 0},
    {category: 'Rent', amount: 0},
    {category: 'Power', amount: 0},
    // Add more data as needed
  ];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  onAdd(){
    const newCategory = {category:'',amount:0,isnew:true};
    this.ELEMENT_DATA = [...this.ELEMENT_DATA,newCategory];
    console.log(this.ELEMENT_DATA)
    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  }
  getTotal(){
    let total = 0;
    for(let data of this.ELEMENT_DATA){
      total = total + Number(data.amount);
    }
    return total;
  }
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = this.filterNumeric(input.value);
  }
  
  private filterNumeric(value: string): string {
    return value.replace(/[^0-9]/g, ''); // Allow only numeric values
  }
  onSaveBudget(){
    this.errormessage = '';
    this.successmessage = ''
    if(this.month!==''&& this.year!==''){
      let monthlyBudgets = [];
      let budgetArray = {
        month:this.month,
        year:parseInt(this.year),
        budgetData:this.ELEMENT_DATA
      }
      monthlyBudgets.push(budgetArray);
      let reqBody = {
        user:sessionStorage.getItem("userId"),
        monthlyBudgets:monthlyBudgets
      }
      console.log(reqBody);
      const headers = new HttpHeaders().set('Authorization', `${sessionStorage.getItem('token')}`);
      this.http.post("http://localhost:8080/budget/createbudget",reqBody,{
        headers: headers,}).subscribe((data:any)=>{
        this.successmessage = data.message
      },(error)=>{
        if(error){
          this.errormessage = "ErrorSavingBudget"
        }
      })

    }
    else{
      this.errormessage = 'Please enter month and year'
    }
  }
  onDelete(i:any){
    this.ELEMENT_DATA.splice(i,1);
    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

  }

  onDashBoard(){
    this.router.navigate(['/dashboard']);
  }
  onLogout(){
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }
}
