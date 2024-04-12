import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import RegisterValidator from './register.validator';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent implements OnInit {
  // registerForm: FormGroup = new FormGroup({
  //   nombre: new FormControl(''),
  //   correo: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   rol: new FormControl('USER_ROLE'),
  // });
  submitted = false;
  registerForm = this.fb.group(
    {
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(13),
        ],
      ],
      confirmPassword: ['', Validators.required],
      rol: ['USER_ROLE', Validators.required],
    },
    { validator: [RegisterValidator.match('password', 'confirmPassword')] }
  );
  constructor(
    // private http: HttpClient,
    private authService: AuthService,
    // private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {}

  get controls(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onReset(): void {
    this.registerForm.reset();
  }
  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const { confirmPassword, ...form } = this.registerForm.value;
    this.authService.doRegister(form);
    // this.http
    //   .post('http://localhost:3000/api/users/register', form)
    //   .subscribe((res: any) => {
    //     this.router.navigateByUrl('/auth/login');
    //   });
  }
}
