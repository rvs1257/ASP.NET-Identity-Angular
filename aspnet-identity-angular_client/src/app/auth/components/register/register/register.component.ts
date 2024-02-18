import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { RegisterRequest } from '@auth/types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  credentials: RegisterRequest = { email: "", password: "", confirmPassword: "" };
  message: string = "";

  @ViewChild('loginForm', { read: NgForm }) loginForm!: NgForm;

  constructor(private authService: AuthService) {
  }

  register() {
    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.message = 'Passwords do not match!';
    } else {
      this.authService.register(this.credentials).subscribe({
        next: () => {
          this.message = 'Registration successful!';
          this.loginForm.resetForm();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

}
