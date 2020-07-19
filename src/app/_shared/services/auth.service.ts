import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentForRegisterDto } from '../models/student-for-register-dto';
import { LoginDto } from '../models/login-dto.model';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginDto: LoginDto = new LoginDto();
  studentToken: any;
  decodedToken: any;
  baseURL = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  studentName: string;
  studentId: any;



  constructor(public http: HttpClient) { }

  register(student: StudentForRegisterDto) {
    const {firstname, lastname, matNo, gender, level, password, faculty, department} = student;
    return this.http.post(this.baseURL + 'register', {firstname, lastname, matNo, gender, level, password, faculty, department});
  }

  login() {
    return  this.http.post(this.baseURL + 'login', this.loginDto).pipe(map((response: any) => {
      console.log(response);
      const tokenResponse = response.token;
      console.log(tokenResponse);
      if (tokenResponse) {
        localStorage.setItem('school_token', tokenResponse);
        this.decodedToken = this.jwtHelper.decodeToken(tokenResponse);
        console.log(this.decodedToken);
        this.studentName = this.decodedToken.unique_name;
        this.studentId = this.decodedToken.nameid;
        console.log(this.studentId);
        console.log(this.studentName);
        this.studentToken = tokenResponse;
        return this.studentToken;
      }
    }));
  }

  loggedIn() {
    const token = localStorage.getItem('school_token');
    if (token) {
      return this.jwtHelper.isTokenExpired(token);
    }
    return true;
  }

  loggedOut() {
    localStorage.removeItem('school_token');
  }



}
