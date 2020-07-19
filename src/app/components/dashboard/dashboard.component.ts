import { Component, OnInit } from '@angular/core';
import { StudentProfile } from 'src/app/_shared/models/student-profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdateStudent } from 'src/app/_shared/models/update-student.model';
import { StudentService } from 'src/app/_shared/services/student.service';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  student: StudentProfile;
  displayModal1 = false;
  displayModal2 = false;
  editProfileForm: FormGroup;
  registerCoursesForm: FormGroup;
  updateStudent: UpdateStudent;
  spin = false;


  constructor(private route: ActivatedRoute, private fb: FormBuilder, private studentService: StudentService,
              private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.student = data.student;
      console.log(data);
      console.log(this.student);
    });
    this.createEditProfileForm();
    this.createRegisterCoursesForm();
  }


  createEditProfileForm() {
    this.registerCoursesForm = this.fb.group({
      course1:  ['', [Validators.required,  Validators.minLength(3),  Validators.maxLength(30)]],
    });
  }

  createRegisterCoursesForm() {
    this.editProfileForm = this.fb.group({
      level:  [this.student.level, [Validators.required,  Validators.minLength(3),  Validators.maxLength(30)]],
      department:  [this.student.department, [Validators.required,  Validators.minLength(3),  Validators.maxLength(30)]],
      faculty:  [this.student.faculty, [Validators.required,  Validators.minLength(3),  Validators.maxLength(30)]],
    });
  }


  showModalDialogEP() {
    this.displayModal1 = true;
  }

  showModalDialogRC() {
    this.displayModal2 = true;
  }

  onSubmit() {
    this.updateStudent = Object.assign({}, this.editProfileForm.value);
    this.studentService.updateStudent(this.updateStudent).subscribe(next => {
      this.displayModal1 = false;
      this.editProfileForm.reset();
      this.alertify.success('Profile updated successfully');
      this.router.navigate(['/dashboard/' + this.studentService.studentId]);
    }, error => {
      this.alertify.error(error);
    });
  }
}
