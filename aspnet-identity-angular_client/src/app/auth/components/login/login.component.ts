import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { LoginRequest } from '@auth/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule]
})
export class LoginComponent {

  returnUrl: string | undefined = undefined;

  loginForm: FormGroup;
  credentials: LoginRequest = { email: "", password: "" };
  message: string = "";

  @ViewChild('loginForm', { read: NgForm }) loginFormRef!: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    router.routerState.root.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.credentials).subscribe({
        next: (response) => {
          this.loginFormRef.resetForm();

          this.router.navigate([this.returnUrl || '/']);
        },
        error: (error) => {
          console.error('Login failed for the given username and password.', error);
        }
      });
    }
  }
}
