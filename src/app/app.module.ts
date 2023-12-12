import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from 'src/components/login/login.component';
import { SignUpComponent } from 'src/components/sign-up/sign-up.component';
import { HomeComponent } from 'src/components/home/home.component';
import { DashboardComponent } from 'src/components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigureBudgetComponent } from 'src/components/configure-budget/configure-budget.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpensesComponent } from 'src/components/expenses/expenses.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    DashboardComponent,
    ConfigureBudgetComponent,
    ExpensesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
