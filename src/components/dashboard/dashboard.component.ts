import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  chart: any;
  userName:any;
  budgetData: any;
  expenseData: any;
  showMessage: boolean =false;
  chart1Data: any = [];
  chart2Data: any = [];
  selectedYear: any;
  selectedMonth: any;
  chart1: any = [];
  chart1Labels: any = [];
  chart1total: any = 0;
  chart2: any = [];
  chart2Labels: any = [];
  chart2total: any = 0;
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
  message: string='';
  Chart1: any;
  Chart2: any;
  Chart3:any;
  constructor(private route:Router, private http:HttpClient){}
  ngOnInit(): void {
    const headers = new HttpHeaders().set('Authorization', `${sessionStorage.getItem('token')}`);
    this.userName = sessionStorage.getItem("userName");
    this.http.get(`http://localhost:8080/budget/getuserbudget/${sessionStorage.getItem("userId")}`, {
      headers: headers,}).subscribe((data:any)=>{
      this.budgetData = data.data;
      this.http.get(`http://localhost:8080/expense/getuserexpense/${sessionStorage.getItem("userId")}`, {
        headers: headers,}).subscribe((data:any)=>{
      this.expenseData = data.data;

      if(this.budgetData!==null && this.expenseData!==null){
        this.showChartsData()
      }
      else{
        this.showMessage = true;
      }
    });
    });
  }
  showChartsData() {
    console.log(this.selectedMonth);
    this.chart1total = 0;
    this.chart2total = 0;
    this.chart1 = this.expenseData.monthlyExpenses.filter((item: any )=>item.year==this.selectedYear&&item.month===this.selectedMonth
    );
    console.log(this.chart1);
    this.chart1Labels = this.chart1.flatMap((data:any)=>data.expenseData.map((items:any)=>{
      return items.category;    
    }))
    console.log(this.chart1Labels);
    this.chart1Data = this.chart1.flatMap((data:any)=>data.expenseData.map((items:any)=>{
      return items.amount;
    }))
    console.log(this.chart1Data);
   this.chart1Data.forEach((element: any) => {
      console.log(element)
      this.chart1total = this.chart1total + Number(element);
     });
     console.log(this.chart1total);
     this.chart2 = this.budgetData.monthlyBudgets.filter((item: any )=>item.year==this.selectedYear&&item.month===this.selectedMonth
    );
    console.log(this.chart2);
    this.chart2Labels = this.chart2.flatMap((data:any)=>data.budgetData.map((items:any)=>{
      return items.category;    
    }))
    console.log(this.chart2Labels);
    this.chart2Data = this.chart2.flatMap((data:any)=>data.budgetData.map((items:any)=>{
      return items.amount;
    }))
    console.log(this.chart2Data);
   this.chart2Data.forEach((element: any) => {
      console.log(element)
      this.chart2total = this.chart2total + Number(element);
     });
     console.log(this.chart2total);
    if (this.chart1Labels.length > 0 && this.chart1Data.length > 0) {
      this.initializeChart();
      this.message = ''
    }
    else{
      this.message = "No data available for selected criteria or please select valid criteria"
    }
  }

  initializeChart() {
    const ctx1 = document.getElementById('myChart1') as HTMLCanvasElement;
    const ctx2 = document.getElementById('myChart2') as HTMLCanvasElement;
    const ctx3 = document.getElementById('myChart3') as HTMLCanvasElement;
    if (this.Chart1) {
      this.Chart1.destroy();
    }
    if (this.Chart2) {
      this.Chart2.destroy();
    }
    if (this.Chart3) {
      this.Chart3.destroy();
    }
    const randomColor = () => {
      // Generate a random hex color
      return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    };
    const chart1Colors = Array.from({ length: this.chart1Data.length }, () => randomColor());
    const chart2Colors = Array.from({ length: this.chart2Data.length }, () => randomColor());
    this.Chart1 = new Chart(ctx1, {
      type: 'bar', // Choose the type of chart (e.g., bar, line, pie)
      data: {
        labels: this.chart1Labels,
        datasets: [{
          label: 'Amount',
          data: this.chart1Data, // Example data
          backgroundColor: chart1Colors,
          borderColor: chart1Colors,
          borderWidth: 1
        }]
      }
    });
    this.Chart2 = new Chart(ctx2, {
      type: 'pie', // Choose the type of chart (e.g., bar, line, pie)
      data: {
        labels: ['Expense', 'Budget'],
        datasets: [{
          label: 'Amount',
          data: [this.chart1total,this.chart2total], // Example data
          backgroundColor: [randomColor(),randomColor()],
          borderColor: [randomColor(),randomColor()],
          borderWidth: 1
        }]
      }
    });
    this.Chart3 = new Chart(ctx3, {
      type: 'line', // Choose the type of chart (e.g., bar, line, pie)
      data: {
        labels: this.chart2Labels,
        datasets: [{
          label: 'Amount',
          data: this.chart2Data, // Example data
          backgroundColor: chart2Colors,
          borderColor: chart2Colors,
          borderWidth: 1
        }]
      }
    });
  }
  onConfigure(){
    console.log("inblock")
    this.route.navigate(['/budget']);
  }
  onExpenses(){
    this.route.navigate(['/expenses']);
  }
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = this.filterNumeric(input.value);
    if(input.value.length===4){
      this.showChartsData()
    }
  }
  
  private filterNumeric(value: string): string {
    return value.replace(/[^0-9]/g, ''); // Allow only numeric values
  }
  onLogout(){
    sessionStorage.clear();
    this.route.navigate(['/home']);
  }
}
