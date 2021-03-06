import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AccountComponent } from './components/account/account.component';
import { RegisterComponent } from './components/account/register/register.component';
import { LoginComponent } from './components/account/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GetStudentProfileResolver } from './_shared/resolvers/getStudentProfileResolver';
import { AuthGuard } from './_shared/guards/auth.guard';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'account', component: AccountComponent, children: [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent}
  ]},
  {path: 'dashboard/:id', component: DashboardComponent,  canActivate: [AuthGuard], resolve: {student: GetStudentProfileResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
