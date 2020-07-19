import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  isCollapsed = false;
  studentId: any;
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService, private route: Router, private alertify: AlertifyService) { }

  ngOnInit() {
    const token = localStorage.getItem('school_token');
    console.log(token);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log(decodedToken);
      this.studentId = decodedToken.nameid;
    }
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }


  loggedOut() {
    this.authService.loggedOut();
    this.route.navigate(['/']);
    this.alertify.success('logged out successfully');

  }
}
