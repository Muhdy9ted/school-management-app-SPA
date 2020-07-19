import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  isCollapsed = false;

  constructor(private authService: AuthService, private route: Router, private alertify: AlertifyService) { }

  ngOnInit() {
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
