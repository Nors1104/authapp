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

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    correo: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    rol: new FormControl('USER_ROLE'),
  });
  submitted = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        correo: ['', Validators.required, Validators.email],
        password: [
          '',
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(13),
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: [RegisterValidator.match('password', 'confirmPassword')] }
    );
  }

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
    this.http
      .post('http://localhost:3000/api/users/register', form)
      .subscribe((res: any) => {
        this.router.navigateByUrl('/auth/login');
      });
  }
}
