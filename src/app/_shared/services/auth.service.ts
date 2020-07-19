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
  userToken: any;
  decodedToken: any;
  baseURL = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();



  constructor(public http: HttpClient) { }

  register(student: StudentForRegisterDto) {
    const {firstname, lastname, matNo, gender, level, password, faculty, department} = student;
    return this.http.post(this.baseURL + 'register', {firstname, lastname, matNo, gender, level, password, faculty, department});
  }

  login() {
    return  this.http.post(this.baseURL + 'login', this.loginDto).pipe(map((response: any) => {
      console.log(response);
      const userResponse = response;
      // if (userResponse) {
      //   localStorage.setItem('preg_token', response.data.tokenData.token);
      //   this.decodedToken = this.jwtHelper.decodeToken(response.data.tokenData.token);
      //   const userEmail = this.decodedToken.email;
      //   const pos = userEmail.indexOf('@');
      //   this.userID = userEmail.substring(0, pos );
      //   console.log(this.userID);
      //   console.log(this.decodedToken);
      //   this.userIdURL = this.decodedToken?.userId;
      //   this.userToken = JSON.stringify(userResponse[0][1]);
      //   console.log(this.decodedToken);
      //   return this.userToken;
      // }
      // if (response.state === 1) {
      //   localStorage.setItem('token', JSON.stringify(response.data));
      //   this.userToken = JSON.stringify(response.data);
      //   return this.userToken;
      // } else {
      //   return response;
      // }
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
