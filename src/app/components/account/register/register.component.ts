import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentForRegisterDto } from 'src/app/_shared/models/student-for-register-dto';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  matNoError: string;
  spin = false;
  student: StudentForRegisterDto;
  genders = ['Male', 'Female'];


  constructor(private fb: FormBuilder, private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required,  Validators.minLength(3),  Validators.maxLength(30)]],
      lastname:  ['', [Validators.required,  Validators.minLength(3),  Validators.maxLength(30)]],
      matNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      level:  ['', [Validators.required,  Validators.minLength(3),  Validators.maxLength(30)]],
      department:  ['', [Validators.required,  Validators.minLength(3),  Validators.maxLength(30)]],
      faculty:  ['', [Validators.required,  Validators.minLength(3),  Validators.maxLength(30)]],
      gender:  [''],
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(formData: FormGroup) {
    return formData.get('password').value === formData.get('confirmPassword').value ? null : {mismatch: true};
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.spin = true;
      this.student = Object.assign({}, this.registerForm.value);
      this.authService.register(this.student).subscribe((response) => {
        console.log(response);
        this.alertify.success('Registration Successful');
        this.spin = false;
      }, (error) => {
        this.matNoError = error.error;
        this.alertify.error('Registration failed, please retry!');
        this.spin = false;
        console.log(error);
      }, () => {
        this.router.navigate(['/account/login']);
      });
    }
  }
}
