import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {
  successmessage: any = '';
  errormessage: string ='';
  displayedColumns: string[] = ['category', 'value', 'actions'];
  constructor(private http:HttpClient,private router: Router){

  }
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
  year:any='';
  month:any=''
  ELEMENT_DATA: any = [
    {category: 'Food', amount: ''},
    {category: 'Travel', amount: ''},
    {category: 'Rent', amount: ''},
    {category: 'Power', amount: ''},
    // Add more data as needed
  ];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  onAdd(){
    const newCategory = {category:'',amount:'',isnew:true};
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
  onDelete(i:any){
    this.ELEMENT_DATA.splice(i,1);
    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

  }
  onSaveExpense(){
    this.successmessage='';
    this.errormessage = ''
    if(this.month!==''&& this.year!==''){
      let monthlyExpenses = [];
      let budgetArray = {
        month:this.month,
        year:parseInt(this.year),
        expenseData:this.ELEMENT_DATA
      }
      monthlyExpenses.push(budgetArray);
      let reqBody = {
        user:sessionStorage.getItem("userId"),
        monthlyExpenses:monthlyExpenses
      }
      console.log(reqBody);
      const headers = new HttpHeaders().set('Authorization', `${sessionStorage.getItem('token')}`);
      this.http.post("http://localhost:8080/expense/createexpense",reqBody,{
        headers: headers,}).subscribe((data:any)=>{
        this.successmessage = data.message
      },(error)=>{
        if(error){
          this.errormessage = "ErrorSavingExpense"
        }
      })

    }
    else{
      this.errormessage = 'Please enter month and year'
    }
  }
  onDashBoard(){
    this.router.navigate(['/dashboard']);
  }
  onLogout(){
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }


}
