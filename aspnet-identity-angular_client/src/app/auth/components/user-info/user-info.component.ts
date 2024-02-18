import { Component } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { ManageInfoResponse } from '@auth/types';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {

  userInfo: ManageInfoResponse = {
    email: '',
    isEmailConfirmed: false
  };

  constructor(
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.info().subscribe({
      next: (response) => {
        this.userInfo = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
