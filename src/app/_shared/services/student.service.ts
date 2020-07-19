import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UpdateStudent } from '../models/update-student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseURL = environment.apiUrl + 'students/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  studentId: any;


  constructor(public http: HttpClient) { }

  studentProfile() {
    const token = localStorage.getItem('school_token');
    console.log(token);
    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
      console.log(this.decodedToken);
      this.studentId = this.decodedToken.nameid;
      console.log(this.studentId);
    }
    return this.http.get(this.baseURL + this.studentId);
  }

  updateStudent(student: UpdateStudent): Observable<UpdateStudent> {
    // const token = localStorage.getItem('school_token');
    // console.log(token);
    // if (token) {
    //   this.decodedToken = this.jwtHelper.decodeToken(token);
    //   console.log(this.decodedToken);
    //   this.studentId = this.decodedToken.nameid;
    // }
    const {level, department, faculty} = student;
    return this.http.put<UpdateStudent>(this.baseURL + this.studentId, {level, department, faculty});
  }
}
