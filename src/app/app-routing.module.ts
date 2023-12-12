import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigureBudgetComponent } from 'src/components/configure-budget/configure-budget.component';
import { DashboardComponent } from 'src/components/dashboard/dashboard.component';
import { ExpensesComponent } from 'src/components/expenses/expenses.component';
import { HomeComponent } from 'src/components/home/home.component';
import { LoginComponent } from 'src/components/login/login.component';
import { SignUpComponent } from 'src/components/sign-up/sign-up.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'budget',component:ConfigureBudgetComponent},
  {path:'expenses',component:ExpensesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
