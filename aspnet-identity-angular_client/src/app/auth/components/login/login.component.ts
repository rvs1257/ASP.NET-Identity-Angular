import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { LoginRequest } from '@auth/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  credentials: LoginRequest = { email: "", password: "" };

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        console.log('Registration successful!');
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }

  register() {
    this.authService.register(this.credentials).subscribe({
      next: () => {
        console.log('Registration successful!');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful!');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
