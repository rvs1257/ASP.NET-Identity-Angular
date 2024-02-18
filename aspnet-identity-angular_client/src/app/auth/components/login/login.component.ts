import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { LoginRequest } from '@auth/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule]
})
export class LoginComponent {

  title: string;

  credentials: LoginRequest = { email: "", password: "" };
  message: string = "";

  @ViewChild('loginForm', { read: NgForm }) loginForm!: NgForm;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router
    ) {
    this.title = titleService.getTitle();
  }

  login() {
    this.titleService.setTitle('Login');

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.loginForm.resetForm();
        this.router.navigate(['/user/info']);
      },
      error: (error) => {
        console.error('Login failed for the given username and password.', error);
      }
    });
  }
}
