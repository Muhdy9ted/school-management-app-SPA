import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import {DialogModule} from 'primeng/dialog';



import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccountComponent } from './components/account/account.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/account/register/register.component';
import { LoginComponent } from './components/account/login/login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GetStudentProfileResolver } from './_shared/resolvers/getStudentProfileResolver';


export function tokenGetter() {
  console.log(localStorage.getItem('school_token'));
  return (localStorage.getItem('school_token'));
}

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    FooterComponent,
    AccountComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    SpinnerComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:50099'],
        disallowedRoutes: ['http://localhost:50099/api/auth/']
      }
    }),
  ],
  providers: [GetStudentProfileResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
