import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule]
})
export class LoginComponent {

  returnUrl: string | undefined = undefined;

  loginForm: FormGroup;
  message: string = "";

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
      this.authService.login({
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }).subscribe({
        next: (response) => {
          this.loginForm.reset();

          this.router.navigate([this.returnUrl || '/']);
        },
        error: (error) => {
          this.message = 'Login failed for the given username and password.';
          console.error('Login failed for the given username and password.', error);
        }
      });
    }
  }
}
