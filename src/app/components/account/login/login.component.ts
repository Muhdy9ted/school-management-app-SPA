import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  spin = false;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    this.spin = true;
    this.authService.login().subscribe((response) => {
      this.spin = false;
      form.reset();
    }, error => {
      this.spin = false;
      this.alertify.error(`Login Failed, please retry`);
    }, () => {
      this.alertify.success(`Welcome back ${this.authService.studentName}`);
      this.router.navigate(['/dashboard', this.authService.studentId]);
    });
  }
}
