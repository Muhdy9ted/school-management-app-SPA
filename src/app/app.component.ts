import { Component, OnInit } from '@angular/core';
import { AuthService } from './_shared/services/auth.service';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError, Event, NavigationCancel } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SchoolManagementApp-SPA';
  showSpinner = false;
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showSpinner = true;
      } else if (routerEvent instanceof NavigationEnd
        || routerEvent instanceof NavigationError
        || routerEvent instanceof NavigationCancel) {
        this.showSpinner = false;
      }
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('school_token');
    console.log(token);
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.authService.studentName = this.authService.decodedToken.unique_name;
      console.log(this.authService.decodedToken);
      console.log(this.authService.studentName);
      this.authService.studentId = this.authService.decodedToken.nameid;
    }
  }

}
